import * as React from 'react'
import InnerPageNav from './inner-page-nav'
import { useAppContext } from '../../../context/app-provider'

interface InputProps {
  pageNums: number
  setCurrentPage: Function
}

interface AnyObject {
  [key: string]: any
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
  selected: Array<number>
  data: Array<AnyObject>
}

interface NavProps {
  tableID: string
  numPages: number
}

function NewPageNavBar({ tableID, numPages }: NavProps) {
  const { tableConfig, setTableConfig } = useAppContext()
  const start = '<<'
  const down = '<'
  const up = '>'
  const end = '>>'
  const ellipsis = '…'

  const pageHandler = (e: any) => {
    let current = getPage(e)
    let { low, upp } = setBounds(current)
    setTableConfig({
      ...tableConfig,
      [tableID]: {
        ...tableConfig[tableID],
        current: current,
        lowerBound: low,
        upperBound: upp,
      },
    })
  }

  const getPage = (e: any) => {
    let current: number = tableConfig[tableID].current
    const directions: any = {
      start: 1,
      down: current == 1 ? 1 : current - 1,
      up: current === numPages ? numPages : current + 1,
      end: numPages,
    }
    return !isNaN(e.target.innerText) ? Number(e.target.innerText) : directions[e.target.id]
  }

  const setBounds = (current: number) => {
    let low: number = 0
    let upp: number = 1
    let tableSpan = tableConfig[tableID].tableSpan
    if (numPages <= tableSpan || current <= Math.round(tableSpan / 2)) {
      low = 1
      upp = numPages <= tableSpan ? numPages : tableSpan
    } else {
      low =
        current <= numPages - tableSpan
          ? current - (Math.round(tableSpan / 2) - 1)
          : numPages - tableSpan
      upp = current <= numPages - tableSpan ? current + Math.round(tableSpan / 2) : numPages
    }
    return { low, upp }
  }

  /**
   * @See InnerPageNav
   */
  return (
    <div className="PageNavBar">
      <button id="start" onClick={pageHandler} className="pageBox" key={'start'}>
        {start}
      </button>
      <button id="down" onClick={pageHandler} className="pageBox" key={'down'}>
        {down}
      </button>
      <InnerPageNav tableID={tableID} numPages={numPages} pageHandler={pageHandler} />
      <button id="up" onClick={pageHandler} className="pageBox" key={'up'}>
        {up}
      </button>
      <button id="end" onClick={pageHandler} className="pageBox" key={'end'}>
        {end}
      </button>
    </div>
  )
}

export default NewPageNavBar
