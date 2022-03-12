import { useAppContext } from '../../../context/AppProvider'
import * as React from 'react'

interface RowsProps {
  rows: Array<object> //will now be the entire dataset
  page: number
  pageSize: number
  tableID: string
}

export default function Rows({ rows, page, pageSize,tableID }: RowsProps) {
  //const { setCreaturePageIDS } = useAppContext()
  const { tableConfig, setTableConfig } = useAppContext()

  let tableSize: number = rows.length
  let pageStart: number = page === 1 ? 0 : (page - 1) * pageSize
  let pageEnd = pageStart + pageSize <= tableSize ? pageStart + pageSize : tableSize
  const pageOfRows = rows.slice(pageStart, pageEnd)

  const setRecID = (event: React.MouseEvent<HTMLDivElement>) => {
    let selected:Array<number> = []
    // Replaced innerText with innerHTML since the HTMLDivElement doesn't support innerText (this should work)
    selected = [...selected,parseInt(event.currentTarget.children[0].innerHTML)]
    setTableConfig({
      ...tableConfig,
      [tableID]: { ...tableConfig[tableID], selected:selected },
    })
  }

  return (
    <>
      {pageOfRows.map((row: any, rowIndex: number) => (
        <div
          id={`row-id-${row.id}`}
          className={'rowStyle'}
          key={`row-key-${rowIndex}`}
          onClick={setRecID}
        >
          {Object.keys(row).map((key: any, cellIndex: number) => {
            return key !== 'id' && (
              <span
                className={'cellStyle'}
                id={`cell-id-${rowIndex}.${cellIndex}`}
                key={`cell-key-${rowIndex}.${cellIndex}`}
              >
                {row[key]}
              </span>
            )
          })}
        </div>
      ))}
    </>
  )
}
