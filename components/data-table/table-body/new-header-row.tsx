import * as React from 'react'

interface colSortObj {
  col: boolean
  dir: number
}

interface AnyObject {
  [key: string]: any
}

interface headerConfig {
  row: Array<string>
  colSortState: { col: boolean; dir: number }[]
  sortColumn: Function
}

function HeaderRow(config: headerConfig) {
  const [colSortArray, setColSortArray] = React.useState<colSortObj[]>([])

  const ascChar = ' ^'
  const descChar = ' ˅'

  const sortTable = (event: any) => {
    // slice off the "˄" and "˅" characters
    const columnKey = event.target.innerText.slice(0, -2)
    const columnID = parseInt(event.target.id)
    config.sortColumn(columnKey, columnID)
  }

  return (
    <div id="header-row" className="headerRow rowStyle">
      {config.row &&
        config.row.map((colName, colIndex) => {
          return (
            <span
              className={'cellStyle'}
              id={`col-id-${colIndex}`}
              key={`col-key-${colIndex}`}
              onClick={sortTable}
            >
              {(colName += config.colSortState[colIndex].dir > 0 ? ascChar : descChar)}
            </span>
          )
        })}
    </div>
  )
}

export default HeaderRow
