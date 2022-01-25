import * as React from 'react'
import SearchInput from './TableBody/SearchInput';
import PageNavBar from './TableBody/PageNavBar'
import {addIndexColumn,sortColumn,renderHeader} from './TableBody/utils'
import HeaderRow from './TableBody/HeaderRow'

interface AnyObject {
  [key: string]: any
}
interface colSortObj {
  col:number,
  dir:number
}
interface AnyObjArray extends Array<AnyObject>{}

interface configObj {
  sortColumns: Array<number>
  header: string
  stripe: boolean
  border: boolean
  pageSize: number
  renderRows: Function
  data: Array<AnyObject>
}

interface TableProps {
    config: configObj
}

function DataTable({
  config
}: TableProps
    ) {
    const [isStriped, setIsStriped] = React.useState(true);

    const [filter, setFilter] = React.useState('');

    const [newRows, setNewRows] = React.useState<AnyObject[]>([]);

    const [filteredRows, setFilteredRows] = React.useState<AnyObject[]>([]);

    const [curPage, setCurPage] = React.useState(0)
    const [numPages, setNumPages] = React.useState(9)
    const [tableSpan, setTableSpan] = React.useState(8)
    const [colSortState, setColSortState] = React.useState<colSortObj[]>([]);

    const setCurrentPage = (page:number) => {
      setCurPage(page)
    }
    const setParentFilter = (value:string) => {
      setFilter(value);

        const tempRows = newRows.filter(row =>
          Object.values(row).some(val =>
              String(val).toLowerCase().includes(value.toLowerCase())
            )
        )
        setFilteredRows(tempRows)
        console.log(tempRows)
        setCurPage(1)
    }

    React.useEffect(()=> {
        const tempRows = addIndexColumn(config.data)
        let sortObject:{col:number,dir:number}[] = []
        let colIndex = 0
        Object.keys(tempRows[0]).forEach(key=>{
                        sortObject.push({col:colIndex,dir:1})
                        colIndex +=1
                      }
                    )
        setColSortState(sortObject)
        setNewRows(tempRows)
        setFilteredRows(tempRows)
    },[])

    React.useEffect(() => {
      setNumPages(filteredRows.length % config.pageSize === 0 ? filteredRows.length/config.pageSize : Math.floor(filteredRows.length/config.pageSize) + 1)
      console.log("DataTable numPages" + numPages)
    },[filteredRows,curPage]);


    return (
      <>
        <SearchInput setParentFilter = {setParentFilter}/>
        <HeaderRow row={newRows[0]} colSortState={colSortState}></HeaderRow>
        <div className={isStriped ? "striped" : ""}>
            {filteredRows.length > 0 ? config.renderRows(filteredRows,curPage,config.pageSize,config.header) : <span>No Data</span>}
        </div>
        <div>
          <PageNavBar numPages={numPages} tableSpan = {tableSpan} setCurrentPage={setCurrentPage}/>
        </div>
        
      </> 
    );
  }

export default DataTable;
