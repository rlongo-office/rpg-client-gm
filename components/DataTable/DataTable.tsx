import * as React from 'react'
import SearchInput from './TableBody/SearchInput';
import PageNavBar from './TableBody/PageNavBar'
import NewPageNavBar from './TableBody/NewPageNavBar'
import {addIndexColumn, sortColumn, renderHeader} from './TableBody/utils'
import HeaderRow from './TableBody/HeaderRow'
import NewHeaderRow from './TableBody/HeaderRow'
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
  header: Array<string>
  stripe: boolean
  border: boolean
  pageSize: number
  data: Array<AnyObject>
}

interface TableProps {
  config: configObj
}

function DataTable({config}: TableProps) {
  const [isStriped, setIsStriped] = React.useState(true);
  const [filter, setFilter] = React.useState('');
  const [newRows, setNewRows] = React.useState<AnyObject[]>([]);
  const [filteredRows, setFilteredRows] = React.useState<AnyObject[]>(config.data || []);
  const [curPage, setCurPage] = React.useState(1)
  const [numPages, setNumPages] = React.useState(9)
  const [tableSpan, setTableSpan] = React.useState(8)
  const [colSortState, setColSortState] = React.useState<colSortObj[]>([]);
  const [sortChange, setSortChange] = React.useState(true)

  //{col: true, dir: 1},{col: true, dir: 1},{col: true, dir: 1},{col: true, dir: 1},{col: true, dir: 1}
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
          return dir;
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
    let sortObjectArray: { col: boolean, dir: number }[] = []
    config.header.forEach(() => {
      sortObjectArray.push({col: true, dir: 1})
      }
    )
    setColSortState(sortObjectArray)
    if (config && config.data && config.data.length > 0) {
      const tempRows = addIndexColumn(config.data)
      setNewRows(tempRows)
      setFilteredRows(tempRows)
      setNumPages(filteredRows.length % config.pageSize === 0 ? filteredRows.length / config.pageSize : Math.floor(filteredRows.length / config.pageSize) + 1)
    }
  }, [])

  React.useEffect(() => {
    const tempRows = addIndexColumn(config.data)
    setNewRows(tempRows)
    setFilteredRows(tempRows)
    setNumPages(filteredRows.length % config.pageSize === 0 ? filteredRows.length / config.pageSize : Math.floor(filteredRows.length / config.pageSize) + 1)
  }, [config.data]);

  React.useEffect(() => {
    setNumPages(filteredRows.length % config.pageSize === 0 ? filteredRows.length / config.pageSize : Math.floor(filteredRows.length / config.pageSize) + 1)
  }, [filteredRows, curPage, numPages]);

  return (
    <>
      <SearchInput setParentFilter={setParentFilter}/>
      <NewHeaderRow row={config.header} colSortState={colSortState} sortColumn={sortColumn}/>
      <div className={isStriped ? "striped" : ""}>
        {
          config.data &&
          <Rows
            rows={filteredRows.length > 0 ? filteredRows : config.data}
            page={curPage}
            pageSize={config.pageSize}
          />
        }
      </div>
      <div>
        <NewPageNavBar numPages={numPages} tableSpan={tableSpan} setCurrentPage={setCurrentPage} page={curPage}/>
      </div>

    </>
  );
}

export default DataTable;
