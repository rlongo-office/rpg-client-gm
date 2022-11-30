import * as React from 'react'

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

function deepCopy(obj: any): any {
  return Object.keys(obj).reduce(
    (v, d) =>
      Object.assign(v, {
        [d]: obj[d].constructor === Object ? deepCopy(obj[d]) : obj[d],
      }),
    {}
  )
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
  // Get the path parsed out into an array
  path = stringToPath(path)
  // Cache the current object
  let current = obj
  let j = 0
  // For each item in the path, dig into the object
  while (j < path.length - 1) {
    current = current[path[j]]
    j += 1
  }
  //if we have a valid path after traversing the
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

const getNodeType = (obj: object) => {
  if (Array.isArray(obj)) {
    return 'array'
  } else {
    if (typeof obj === 'object') {
      return 'object'
    } else return 'value'
  }
}

/* The follow grabs the subVal and subPath string for each child entry in an object, if the val is of
array or object. In the object editor component, we are using this function parse out the next level
of children for rendering the tree for an object */
const getChildNodes = (parent: string, val: any) => {
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
        label: index,
        value: subVal,
        subPath: `${parentPath}${arrayIndex}`,
        type: getNodeType(subVal),
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
          label: key,
          value: subVal,
          subPath: `${parentPath}${dotOrNot}${key}`,
          type: getNodeType(subVal),
        })
      })
    }
  }
  return childNodeArray
}



export {
  addIndexColumn,
  sortColumn,
  parseDataForTable,
  propertiesToArray,
  iterateObjEntries,
  getObjValue,
  setObjValue,
  deepCopy,
  createObjID,
  getNodeType,
  getChildNodes,
}
