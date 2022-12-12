import { useAppContext } from '@context/app-provider'
import * as React from 'react'

interface RowsProps {
  rows: Array<object>
  page: number
  pageSize: number
  tableID: string
}

export default function Rows({ rows, page, pageSize, tableID }: RowsProps) {
  const { tableConfig, setTableConfig } = useAppContext()

  let tableSize: number = rows.length
  let pageStart: number = page === 1 ? 0 : (page - 1) * pageSize
  let pageEnd = pageStart + pageSize <= tableSize ? pageStart + pageSize : tableSize
  const pageOfRows = rows.slice(pageStart, pageEnd)

  const setRecID = (event: React.MouseEvent<HTMLDivElement>) => {
    let selected: Array<string> = []
    const start = String('row-id-').length
    const elID = String(event.currentTarget.id)
    selected = [...selected, elID.slice(start)]
    setTableConfig({
      ...tableConfig,
      [tableID]: { ...tableConfig[tableID], selected: selected },
    })
  }

  return (
    <>
      {pageOfRows.map((row: any, rowIndex: number) => (
        <div
          id={`row-id-${row.index}`}
          className={'rowStyle'}
          key={`row-key-${rowIndex}`}
          onClick={setRecID}
        >
          {Object.keys(row).map((key: any, cellIndex: number) => {
            return (
              key !== 'index' && (
                <span
                  className={'cellStyle'}
                  id={`cell-id-${rowIndex}.${cellIndex}`}
                  key={`cell-key-${rowIndex}.${cellIndex}`}
                >
                  {row[key]}
                </span>
              )
            )
          })}
        </div>
      ))}
    </>
  )
}
