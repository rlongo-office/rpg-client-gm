import * as React from 'react'
import SearchInput from './TableBody/SearchInput';

interface AnyObject {
  [key: string]: any
}

interface AnyObjArray extends Array<AnyObject>{}

interface TableProps {
    config: any
    renderRows: Function
    rows: Array<AnyObject>
}

function DataTable({
    config,
    renderRows, 
    rows}: TableProps
    ) {
    const [isStriped, setIsStriped] = React.useState(true);

    const [filter, setFilter] = React.useState('');

    const [newRows, setNewRows] = React.useState<AnyObject[]>([]);

    const [filteredRows, setFilteredRows] = React.useState<AnyObject[]>([]);

    const setTableFilterFromInput = (value:string) => {
      console.log(`"filter value from child is " ${value}`)
      setFilter(value);

        const tempRows = rows.filter(row =>
          Object.values(row).some(val =>
              String(val).includes(filter)
            )
        )

        setFilteredRows(tempRows)

    }

    /*
    let recCount = 0
    let tempArray: AnyObjArray
    rows.forEach((row)=>{

      if (!(row==null)){
        var newRow:AnyObject = {}
        newRow.recID = recCount
        for (const [key,value] of Object.entries(row)){
          newRow[key] = value
        }
        tempArray.push(newRow)
        recCount += 1
      }
    })
    */

    return (
      <>
        <SearchInput setParentFilter = {setTableFilterFromInput}/>
        <div className={isStriped ? "striped" : ""}>
            {rows.length > 0 ? renderRows(filteredRows) : <span>No Data</span>}
        </div> 
      </> 
    );
  }

export default DataTable;
