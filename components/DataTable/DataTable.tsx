import * as React from 'react'
import SearchInput from './TableBody/SearchInput';
import PageNavBar from './TableBody/PageNavBar'

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

    const [pageSize, setPageSize] = React.useState(10)

    const [curPage, setCurPage] = React.useState(0)
    const [numPages, setNumPages] = React.useState(9)
    const [tableSpan, setTableSpan] = React.useState(7)

    const setTableFilterFromInput = (value:string) => {
      console.log(`"filter value from child is " ${value}`)
      setFilter(value);

        const tempRows = rows.filter(row =>
          Object.values(row).some(val =>
              String(val).toLowerCase().includes(filter.toLowerCase())
            )
        )
        setFilteredRows(tempRows)
    }

    

    const setCurrentPage = (page:number) => {
      setCurPage(page)
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

    React.useEffect(() => {
      setNumPages(filteredRows.length % pageSize == 0 ? filteredRows.length/pageSize : Math.floor(filteredRows.length/pageSize) + 1)
      console.log("DataTable numPages" + numPages)
    },[filteredRows,curPage]);


    return (
      <>
        <SearchInput setParentFilter = {setTableFilterFromInput}/>
        <div className={isStriped ? "striped" : ""}>
            {rows.length > 0 ? renderRows(filteredRows,curPage,10) : <span>No Data</span>}
        </div>
        <PageNavBar numPages={numPages} tableSpan = {tableSpan} setCurrentPage={setCurrentPage}/>
      </> 
    );
  }

export default DataTable;
