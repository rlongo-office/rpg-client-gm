import * as React from 'react'
import SearchInput from './TableBody/SearchInput';
import PageNavBar from './TableBody/PageNavBar'
import {addIndexColumn, sortColumn, renderHeader} from './TableBody/utils'
import HeaderRow from './TableBody/HeaderRow'
import Rows from './TableBody/Rows'

interface AnyObject {
  [key: string]: any
}

interface colSortObj {
  col: boolean,
  dir: number
}

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

function DataTable({config}: TableProps) {
  const [isStriped, setIsStriped] = React.useState(true);

  const [filter, setFilter] = React.useState('');

  const [newRows, setNewRows] = React.useState<AnyObject[]>([]);

  const [filteredRows, setFilteredRows] = React.useState<AnyObject[]>([]);

  const [curPage, setCurPage] = React.useState(1)
  const [numPages, setNumPages] = React.useState(9)
  const [tableSpan, setTableSpan] = React.useState(8)
  const [colSortState, setColSortState] = React.useState<colSortObj[]>([]);
  const [sortChange, setSortChange] = React.useState(true)

  const setCurrentPage = (page: number) => {
    setCurPage(page)
  }

  const sortColumn = (columnKey: string, columnID: number) => {
    const dir = colSortState[columnID].dir
    let tempArray: Array<AnyObject> = []
    tempArray = filteredRows.sort((a, b) => {
      if (isNaN(a[columnKey])) {
        let valueA = a[columnKey].toUpperCase()
        let valueB = b[columnKey].toUpperCase()
        if (valueA < valueB) {
          return -1 * dir;
        }
        if (valueA > valueB) {
          return 1 * dir;
        }
        return 0;
      } else {
        if (dir > 0) {
          return (a[columnKey] - b[columnKey])
        } else return (b[columnKey] - a[columnKey])
      }
    })
    let colSortArray = colSortState
    colSortArray[columnID].dir *= -1     //reverse the direction of the sort for next click
    setFilteredRows(tempArray)
    setColSortState(colSortArray)
    setCurPage(1)
    setSortChange(!sortChange)
  }

  const setParentFilter = (value: string) => {
    setFilter(value);

    const tempRows = newRows.filter(row =>
      Object.values(row).some(val =>
        String(val).toLowerCase().includes(value.toLowerCase())
      )
    )
    setFilteredRows(tempRows)
    setCurPage(1)
  }

  React.useEffect(() => {
    const tempRows = addIndexColumn(config.data)
    let sortObjectArray: { col: boolean, dir: number }[] = []
    Object.keys(tempRows[0]).forEach(key => {
        sortObjectArray.push({col: true, dir: 1})
      }
    )
    setColSortState(sortObjectArray)
    setNewRows(tempRows)
    setFilteredRows(tempRows)
  }, [])

  React.useEffect(() => {
  }, [sortChange])


  React.useEffect(() => {
    setNumPages(filteredRows.length % config.pageSize === 0 ? filteredRows.length / config.pageSize : Math.floor(filteredRows.length / config.pageSize) + 1)
  }, [filteredRows, curPage]);

  return (
    <>
      <SearchInput setParentFilter={setParentFilter}/>
      <HeaderRow row={newRows[0]} colSortState={colSortState} sortColumn={sortColumn}/>
      <div className={isStriped ? "striped" : ""}>
        <Rows rows={filteredRows} page={curPage} pageSize={config.pageSize} header={config.header}/>
      </div>
      <div>
        <PageNavBar numPages={numPages} tableSpan={tableSpan} setCurrentPage={setCurrentPage} page={curPage}/>
      </div>

    </>
  );
}

export default DataTable;
