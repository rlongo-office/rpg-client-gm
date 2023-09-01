import { DescriptorElem } from '@apptypes/input-types'

interface AnyObject {
  [key: string]: any
}

interface AnyObjArray extends Array<AnyObject> {}

const addIndexColumn = (rows: AnyObject[]) => {
  let recCount = 0
  let tempArray: AnyObjArray = []
  rows?.forEach(row => {
    if (!(row == null)) {
      let newRow: AnyObject = {}
      newRow['recID'] = recCount
      for (const [key, value] of Object.entries(row)) {
        newRow[key] = value
      }
      tempArray.push(newRow)
      recCount += 1
    }
  })
  return tempArray
}

const sortColumn = (rows: AnyObjArray, column: number, direct: number) => {
  const tempRows = rows.sort(function (a, b) {
    const keys = Object.keys(a)
    console.log(keys)
    let keyA = a[keys[column]],
      keyB = b[keys[column]]
    // Compare the 2 dates
    if (keyA < keyB) return -direct
    if (keyA > keyB) return direct
    return 0
  })
  return tempRows
}

const parseDataForTable = (data: Array<AnyObject>, columnKeys: Array<string>) => {
  let newData: Array<AnyObject> = []
  newData = data.map(row => {
    let rowObj: AnyObject = {}
    columnKeys.forEach(key => {
      //a key is path in format of a[1].b.c.d[5].f[4]
      if (key === '_id.$oid') {
        rowObj['id'] = getObjValue(row, key, 'none')
      } else {
        rowObj[key] = getObjValue(row, key, 'none')
      }
    })
    return rowObj
  })
  return newData
}

function propertiesToArray(obj: object) {
  const isObject = (val: any) => val && typeof val === 'object' && !Array.isArray(val)

  const addDelimiter = (a: string, b: string) => (a ? `${a}.${b}` : b)

  const paths: any = (obj: object = {}, head = '') => {
    return Object.entries(obj).reduce((product: any, [key, value]) => {
      let fullPath: string = addDelimiter(head, key)
      return isObject(value) ? product.concat(paths(value, fullPath)) : product.concat(fullPath)
    }, [])
  }

  return paths(obj)
}

function oldDeepCopy(obj: any): any {
  return Object.keys(obj).reduce(
    (v, d) =>
      Object.assign(v, {
        [d]: obj[d].constructor === Object ? oldDeepCopy(obj[d]) : obj[d],
      }),
    {}
  )
}

function deepCopy(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(deepCopy)
  }

  if (typeof obj === 'object' && obj !== null) {
    const copy: any = {}

    for (const key in obj) {
      copy[key] = deepCopy(obj[key])
    }

    return copy
  }

  return obj
}

//expandedDeepCopy untested, may have some application in the future to overcome the limitations of deepCopy above
//For example, apparently nested arrays will only be shallow. This copy will potentially work even if the object
//has accessor function properties
function expandedDeepCopy(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(expandedDeepCopy)
  }

  if (obj && typeof obj === 'object') {
    const copy: any = {}
    const descriptors = Object.getOwnPropertyDescriptors(obj)

    for (const key in descriptors) {
      if (descriptors.hasOwnProperty(key)) {
        const descriptor = descriptors[key]
        if ('value' in descriptor) {
          copy[key] = expandedDeepCopy(descriptor.value)
        } else if ('get' in descriptor) {
          Object.defineProperty(copy, key, {
            get: () => expandedDeepCopy(obj[key]),
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
          })
        }
      }
    }

    return copy
  }

  return obj
}

//constructPathMap untested, may have some application in the future
const constructPathMap = (val: any, parentPath = '') => {
  let pathMap: any = {}

  if (Array.isArray(val)) {
    val.forEach((subVal: any, index: number) => {
      const arrayIndex = `[${index}]`
      const newPath = parentPath ? `${parentPath}.${arrayIndex}` : arrayIndex
      const subPathMap = constructPathMap(subVal, newPath)
      pathMap = { ...pathMap, ...subPathMap }
    })
  } else if (typeof val === 'object' && val !== null) {
    Object.entries(val).forEach(([key, value]) => {
      const newPath = parentPath ? `${parentPath}.${key}` : key
      const subPathMap = constructPathMap(value, newPath)
      pathMap = { ...pathMap, ...subPathMap }
    })
  } else {
    pathMap[parentPath] = parentPath
  }

  return pathMap
}

const iterateObjEntries = (parent: string, val: any, objPath: Array<string>) => {
  let parentPath = parent === '' ? '' : parent
  if (Array.isArray(val)) {
    let index = 0
    if (val.length === 0) {
      objPath.push(parent)
    }
    val.forEach((subVal: any) => {
      let arrayIndex = '[' + index + ']'
      if (typeof subVal === 'object') {
        if (!Array.isArray(subVal)) {
          Object.keys(subVal).forEach(key => {
            let value = subVal[key]
            if (value === null) {
              value = 'null'
            }
            iterateObjEntries(parentPath + arrayIndex + '.' + key, value, objPath)
          })
        } else {
          iterateObjEntries(parentPath + arrayIndex, subVal, objPath)
        }
      } else {
        objPath.push(parentPath + arrayIndex)
      }
      index += 1
    })
  } else {
    let dotOrNot = parentPath === '' ? '' : '.'
    if (typeof val === 'object') {
      Object.keys(val).forEach(key => {
        let value = val[key]
        if (value === null) {
          value = 'null'
        }
        iterateObjEntries(parent + dotOrNot + key, value, objPath)
      })
    } else {
      objPath.push(parent)
    }
  }
}

const stringToPath = function (path: any) {
  // If the path isn't a string, return it
  if (typeof path !== 'string') return path
  // Create new array
  let output: Array<string> = []
  // Split to an array with dot notation
  path.split('.').forEach(function (item, index) {
    // Split to an array with bracket notation
    item.split(/\[(.*?)\]/g).forEach(function (key) {
      // Push to the new array
      if (key.length > 0) {
        output.push(key)
      }
    })
  })
  return output
}

const getObjValue = function (obj: any, path: string, def: any) {
  //path is string like a[3].b.c[6].d  etc  creatures[a[3].d]
  /**
   * If the path is a string, convert it to an array
   * @param  {String|Array} path The path
   * @return {Array}             The path array
   */
  // Get the path as an array
  path = stringToPath(path)
  // Cache the current object
  let current = obj
  // For each item in the path, dig into the object
  for (let i = 0; i < path.length; i++) {
    // If the item isn't found, return the default (or null)
    if (!current[path[i]]) return def
    // Otherwise, update the current value with added path element
    current = current[path[i]]
  }
  return current
}

const setObjValue = function (obj: any, path: string, value: any) {
  /**
   * If the path is a string, convert it to an array
   * @param  {String|Array} path The path
   * @return {Array}             The path array
   */
  // Get the path as an array
  path = stringToPath(path)
  // Cache the current object
  let current = obj
  let j = 0
  // For each item in the path, dig into the object
  while (j < path.length - 1) {
    current = current[path[j]]
    j += 1
  }
  current[path[j]] = !current[path[j]] ? null : value
}

type CreatureType = {
  _id: {
    $oid: string
  }
  name: string
}

const createObjID = (data: AnyObject[], record: AnyObject) => {
  let index = data.length //since we are 0 based, length actually gives us current position
  // should be unique enough for our purposes
  record._id['$oid'] = index + record.name
  return record
}

const getCurrentTimeString = (): string => {
  const currentDate = new Date()
  const year = String(currentDate.getFullYear()).slice(-2)
  const month = String(currentDate.getMonth() + 1).padStart(2, '0')
  const day = String(currentDate.getDate()).padStart(2, '0')
  const hours = String(currentDate.getHours()).padStart(2, '0')
  const minutes = String(currentDate.getMinutes()).padStart(2, '0')
  const seconds = String(currentDate.getSeconds()).padStart(2, '0')

  const currentTimeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  return currentTimeString
}

const getNodeType = (obj: object) => {
  if (Array.isArray(obj)) {
    return 'array'
  } else {
    if (typeof obj === 'object') {
      return 'object'
    } else return 'primitive'
  }
}

/* The follow grabs the subVal and subPath string for each child entry in an object, if the val is of
array or object. In the object editor component, we are using this function parse out the next level
of children for rendering the tree for an object */
function getChildNodes<T>(parent: string, val: any, descriptor: DescriptorElem<T>) {
  let childNodeArray = []
  let parentPath = parent === '' ? '' : parent
  if (Array.isArray(val)) {
    let index = 0
    if (val.length === 0) {
      childNodeArray.push(parent)
    }
    val.forEach((subVal: any) => {
      let arrayIndex = '[' + index + ']'
      childNodeArray.push({
        index: index,
        subSource: subVal,
        path: `${parentPath}${arrayIndex}`,
        nodeType: getNodeType(subVal),
        descriptor: descriptor.child
      })
      index += 1
    })
  } else {
    let dotOrNot = parentPath === '' ? '' : '.'
    if (typeof val === 'object') {
      Object.keys(val).forEach(key => {
        let subVal = val[key]
        if (subVal === null) {
          subVal = 'null'
        }
        childNodeArray.push({
          index: key,
          subSource: subVal,
          path: `${parentPath}${dotOrNot}${key}`,
          nodeType: getNodeType(subVal),
          descriptor: descriptor[key]
        })
      })
    }
  }
  //console.log('Child Node Array:' + JSON.stringify(childNodeArray))
  return childNodeArray
}

function sender2TextType(sender: string, users: string[]) {
  console.log(`sender: ${sender}  users: ${users}`)
  if (users.includes(sender)) {
    return 'playerText'
  } else {
    switch (sender) {
      case 'gm':
        return 'gmText'
      case 'game':
        return 'gameText'
      case 'alert':
        return 'alertText'
      case 'lore':
        return 'loreText'
      default:
        return 'baseText'
    }
  }
}

function getStringWidth(text, font) {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  context.font = font
  return context.measureText(text).width
}

export const capFirst = (input: string) => input.charAt(0).toUpperCase() + input.slice(1)
export const capReturnFirst = (input: string) => input.charAt(0).toUpperCase()
/*Types don't survive beyond compile, you cannot take a type and easily create a blank object from it
So this function uses the descriptor and creates a blank object from it/It is recursive as object descriptors
can include other object descriptors. However, for now object descriptors currently wont have chidren that
are arrays, so that is not handled */
export function createBlankObjectFromDescriptor<T>(descriptor: DescriptorElem<T>): T {
  const blankObject: any = {}

  for (const key in descriptor.child) {
    const childDescriptor = descriptor.child[key]

    if (childDescriptor.type === 'primitive') {
      if (childDescriptor.input === 'text') {
        blankObject[key] = ''
      } else if (childDescriptor.input === 'number') {
        blankObject[key] = 0
      } else if (childDescriptor.input === 'boolean') {
        blankObject[key] = false
      }
    } else if (childDescriptor.type === 'list') {
      if (childDescriptor.dataType === 'string') {
        blankObject[key] = []
      } else if (childDescriptor.dataType === 'number') {
        blankObject[key] = []
      }
    } else if (childDescriptor.type === 'object') {
      blankObject[key] = createBlankObjectFromDescriptor(childDescriptor)
    }
  }

  return blankObject as T
}

export {
  addIndexColumn,
  sortColumn,
  parseDataForTable,
  propertiesToArray,
  constructPathMap,
  iterateObjEntries,
  getObjValue,
  setObjValue,
  deepCopy,
  createObjID,
  getCurrentTimeString,
  getNodeType,
  getChildNodes,
  sender2TextType,
  oldDeepCopy,
  getStringWidth,
}
