
interface AnyObject {
    [key: string]: any
  }

interface AnyObjArray extends Array<AnyObject>{}

const addIndexColumn = (rows:AnyObjArray)=>{
    let recCount = 0
    let tempArray: AnyObjArray=[]
    rows.forEach((row)=>{
      if (!(row==null)){
        var newRow:AnyObject = {}
        newRow["recID"] = recCount
        for (const [key,value] of Object.entries(row)){
          newRow[key] = value
        }
        tempArray.push(newRow)
        recCount += 1
      }
    })
    return tempArray
}

const sortColumn = (rows:AnyObjArray,column:number,direct:number)=>{
    const tempRows = rows.sort(function(a, b) {
                        const keys = Object.keys(a)
                        console.log(keys)
                        var keyA = a[keys[column]],
                        keyB = b[keys[column]];
                        // Compare the 2 dates
                        if (keyA < keyB) return -(direct);
                        if (keyA > keyB) return direct;
                        return 0;
                    });
    return tempRows

}

const parseDataForTable = (data:Array<AnyObject>,columnKeys:Array<string>)=>{
  let newData:Array<AnyObject>=[]
  newData = data.map(row=>{
      let rowObj:AnyObject = {}
      columnKeys.forEach(key=>{
        rowObj[key] = row[key]
      })
      return rowObj
  })
  return newData
}

const renderHeader = (row:Object)=> {
    let content: JSX.Element[] = [];
    const keys = Object.keys(row)
    keys.map(key=>{
        content.push( 
            <span className="cellStyle" key={`row-${key}`} >{key}</span>
            )
    })
    return content;
}

function propertiesToArray(obj:object) {
  const isObject = (val:any) =>
    val && typeof val === 'object' && !Array.isArray(val);

  const addDelimiter = (a:string, b:string) =>
    a ? `${a}.${b}` : b;

  const paths:any = (obj:object = {}, head = '') => {
    return Object.entries(obj)
      .reduce((product:any, [key, value]) => 
        {
          let fullPath:string = addDelimiter(head, key)
          return isObject(value) ?
            product.concat(paths(value, fullPath))
          : product.concat(fullPath)
        }, []);
  }

  return paths(obj);
}

const iterateObjEntries = (parent:string,val:any,objPath:Array<string>)=>{
  let parentPath = parent==="" ? "" : parent 
  if (Array.isArray(val)){
    let index = 0
    if (val.length === 0){
      objPath.push(parent)
    }
    val.forEach((subVal:any)=>{
      let arrayIndex = "[" + index + "]"
      if (typeof subVal === 'object'){
        if (!(Array.isArray(subVal))){
          Object.keys(subVal).forEach((key)=>{
            let value = subVal[key]
            if (value === null) {
              value = "null"
            }
            iterateObjEntries(parentPath + arrayIndex + "." + key,value,objPath)
          })
        } else {
          iterateObjEntries(parentPath + arrayIndex,subVal,objPath)
        }
      } else {
        objPath.push(parentPath + arrayIndex)
      }
      index +=1
    })
  } else {
    let dotOrNot = parentPath==="" ? "" : "." 
    if (typeof val === 'object'){
        Object.keys(val).forEach((key)=>{
          let value = val[key]
          if (value === null) {
            value = "null"
          }
        iterateObjEntries(parent+dotOrNot+key,value,objPath)
      })
    } else {
      objPath.push(parent)
    }
  } 
}

var getObjValue = function (obj:any, path:string, def:any) {
	/**
	 * If the path is a string, convert it to an array
	 * @param  {String|Array} path The path
	 * @return {Array}             The path array
	 */
	var stringToPath = function (path:any) {
		// If the path isn't a string, return it
		if (typeof path !== 'string') return path;
		// Create new array
		var output:Array<string> = [];
		// Split to an array with dot notation
		path.split('.').forEach(function (item, index) {
			// Split to an array with bracket notation
			item.split(/\[(.*?)\]/g).forEach(function (key) {
				// Push to the new array
				if (key.length > 0) {
					output.push(key);
				}
			});
		});
		return output;
	};
	// Get the path as an array
	path = stringToPath(path);
	// Cache the current object
	var current = obj;
	// For each item in the path, dig into the object
	for (var i = 0; i < path.length; i++) {
		// If the item isn't found, return the default (or null)
		if (!current[path[i]]) return def;
		// Otherwise, update the current  value
		current = current[path[i]];
	}
	return current;
};

export {addIndexColumn,sortColumn,renderHeader,parseDataForTable,propertiesToArray,iterateObjEntries,getObjValue}