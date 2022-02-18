import {useAppContext} from '../../../context/AppProvider'
import * as React from 'react'
import * as Types from '../../../types/rpg-types'

interface RowsProps {
  rows: Array<object>,
  page: number,
  pageSize: number,
  header: string
}

export default function Rows({rows, page, pageSize}: RowsProps) {
  const {setCreaturePageIDS} = useAppContext()

  let tableSize: number = rows.length
  let pageStart: number = page === 1 ? 0 : (page - 1) * pageSize
  let pageEnd = pageStart + pageSize <= tableSize ? pageStart + pageSize : tableSize
  const pageOfRows = rows.slice(pageStart, pageEnd)

  const setRecID = (event: React.MouseEvent<HTMLDivElement>) => {
    // Replaced innerText with innerHTML since the HTMLDivElement doesn't support innerText (this should work)
    setCreaturePageIDS(parseInt(event.currentTarget.children[0].innerHTML))
  }

  return (
    <>
      {
        pageOfRows.map((row: any, rowIndex: number) => (
            <div
              id={`row-id-${rowIndex}`}
              className={'rowStyle'}
              key={`row-key-${rowIndex}`}
              onClick={setRecID}
            >
              {
                Object.keys(row).map((key: any, cellIndex: number) => {
                  return (
                    <span
                      className={'cellStyle'}
                      id={`cell-id-${rowIndex}.${cellIndex}`}
                      key={`cell-key-${rowIndex}.${cellIndex}`}
                    >
                      {row[key]}
                    </span>
                  )
                })
              }
            </div>
          )
        )
      }
    </>
  )
}
