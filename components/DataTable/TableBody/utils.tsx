
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

export {addIndexColumn,sortColumn,renderHeader,parseDataForTable}