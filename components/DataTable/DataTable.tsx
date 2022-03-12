import * as React from 'react'
import SearchInput from './TableBody/SearchInput'
import PageNavBar from './TableBody/PageNavBar'
import NewPageNavBar from './TableBody/NewPageNavBar'
import { addIndexColumn, sortColumn, renderHeader } from './TableBody/utils'
import HeaderRow from './TableBody/HeaderRow'
import NewHeaderRow from './TableBody/HeaderRow'
import Rows from './TableBody/Rows'
import { useAppContext } from '../../context/AppProvider'

interface AnyObject {
  [key: string]: any
}

interface colSortObj {
  col: boolean
  dir: number
}

interface TableConfig {
  tableID: string
  sortColumns: Array<number>
  header: Array<string>
  stripe: boolean
  border: boolean
  pageSize: number
  current: number
  tableSpan: number
  lowerBound: number
  upperBound: number
  data: Array<AnyObject>
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
  tableID: 'creatureConfig' | 'actorConfig'
}

function DataTable({tableID }: TableProps ) {
  const { tableConfig, setTableConfig } = useAppContext()
  const config = tableConfig[tableID]
  const [isStriped, setIsStriped] = React.useState(true)
  const [filter, setFilter] = React.useState('')
  const [newRows, setNewRows] = React.useState<AnyObject[]>([])
  const [filteredRows, setFilteredRows] = React.useState<AnyObject[]>(config.data || [])
  const [curPage, setCurPage] = React.useState<number>(1)
  const [numPages, setNumPages] = React.useState(9)
  const [colSortState, setColSortState] = React.useState<colSortObj[]>([])
  const [sortChange, setSortChange] = React.useState(true)

  //{col: true, dir: 1},{col: true, dir: 1},{col: true, dir: 1},{col: true, dir: 1},{col: true, dir: 1}
  const setCurrentPage = (e: any) => {
    if (e) {
      //setCurPage(getPage(e))
      setTableConfig({
        ...tableConfig,
        [config.tableID]: { ...tableConfig[config.tableID], current: getPage(e) },
      })
    }
  }

  const getPage = (e: any) => {
    const directions: any = {
      start: 1,
      down: curPage == 1 ? 1 : curPage - 1,
      up: curPage === numPages ? numPages : curPage + 1,
      end: numPages,
    }
    return !isNaN(e.text) ? Number(e.text) : directions[e.id]
  }

  const setBounds = () => {
    debugger
    let low: number = 0
    let upp: number = 1
    if (numPages <= config.tableSpan || config.current <= Math.round(config.tableSpan / 2)) {
      low = 1
      upp = numPages <= config.tableSpan ? numPages : config.tableSpan
    } else {
      low =
        config.current <= numPages - config.tableSpan
          ? config.current - (Math.round(config.tableSpan / 2) - 1)
          : numPages - config.tableSpan
      upp =
        config.current <= numPages - config.tableSpan
          ? config.current + Math.round(config.tableSpan / 2)
          : numPages
    }
    setTableConfig({
      ...tableConfig,
      [config.tableID]: { ...tableConfig[config.tableID], lowerBound: low, upperBound: upp },
    })
  }

  const sortColumn = (columnKey: string, columnID: number) => {
    const dir = colSortState[columnID].dir
    let tempArray: Array<AnyObject> = []
    tempArray = filteredRows.sort((a, b) => {
      if (isNaN(a[columnKey])) {
        let valueA = a[columnKey].toUpperCase()
        let valueB = b[columnKey].toUpperCase()
        if (valueA < valueB) {
          return -1 * dir
        }
        if (valueA > valueB) {
          return dir
        }
        return 0
      } else {
        if (dir > 0) {
          return a[columnKey] - b[columnKey]
        } else return b[columnKey] - a[columnKey]
      }
    })
    let colSortArray = colSortState
    colSortArray[columnID].dir *= -1 //reverse the direction of the sort for next click
    setFilteredRows(tempArray)
    setColSortState(colSortArray)
    setTableConfig({
      ...tableConfig,
      [config.tableID]: { ...tableConfig[config.tableID], current: 1 },
    })
    //setCurPage(1)
    setSortChange(!sortChange)
  }

  const setParentFilter = (value: string) => {
    setFilter(value)

    const tempRows = newRows.filter(row =>
      Object.values(row).some(val => String(val).toLowerCase().includes(value.toLowerCase()))
    )
    setFilteredRows(tempRows)
    setTableConfig({
      ...tableConfig,
      [config.tableID]: { ...tableConfig[config.tableID], current: 1 },
    })
    //setCurPage(1)
  }

  React.useEffect(() => {
    let sortObjectArray: { col: boolean; dir: number }[] = []
    config.header.forEach(() => {
      sortObjectArray.push({ col: true, dir: 1 })
    })
    setColSortState(sortObjectArray)
    if (config && config.data && config.data.length > 0) {
      setNewRows(config.data)
      setFilteredRows(config.data)
      setNumPages(
        filteredRows.length % config.pageSize === 0
          ? filteredRows.length / config.pageSize
          : Math.floor(filteredRows.length / config.pageSize) + 1
      )
    }
  }, [])

  React.useEffect(() => {
    //const tempRows = addIndexColumn(config.data)
    setNewRows(config.data)
    setFilteredRows(config.data)
    setNumPages(
      filteredRows.length % config.pageSize === 0
        ? filteredRows.length / config.pageSize
        : Math.floor(filteredRows.length / config.pageSize) + 1
    )
  }, [config])

  React.useEffect(() => {
    setNumPages(
      filteredRows.length % config.pageSize === 0
        ? filteredRows.length / config.pageSize
        : Math.floor(filteredRows.length / config.pageSize) + 1
    )
    //setBounds()
  }, [filteredRows, numPages])

  return (
    <>
      <SearchInput setParentFilter={setParentFilter} />
      <NewHeaderRow row={config.header} colSortState={colSortState} sortColumn={sortColumn} />
      <div className={isStriped ? 'striped' : ''}>
        {config.data && (
          <Rows
            rows={filteredRows.length > 0 ? filteredRows : config.data}
            page={config.current}
            pageSize={config.pageSize}
            tableID = {config.tableID}
          />
        )}
      </div>
      <div>
        <NewPageNavBar tableID={config.tableID} numPages={numPages} />
      </div>
    </>
  )
}

export default DataTable
