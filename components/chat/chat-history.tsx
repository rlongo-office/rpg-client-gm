import * as React from 'react'
import { useAppContext } from '../../context/app-provider'

export default function ChatHistory() {
  const { messages } = useAppContext()

  return (
    <div>
      <h4>Chat History</h4>
      {messages.map((row: any, rowIndex: number) => (
        <div id={`row-id-${rowIndex}`} key={`row-key-${rowIndex}`}>
          <span className={'cellStyle'}>
            {Object.keys(row).map((key: any, cellIndex: number) => {
              return row[key]
            })}
          </span>
        </div>
      ))}
    </div>
    // <div className={'chatTableWrapper'}>
    //   {messages.map((row: any, rowIndex: number) => (
    //     <div
    //       id={`row-id-${row.timeStamp}`}
    //       key={`row-key-${rowIndex}`}
    //     >
    //       {Object.keys(row).map((key: any, cellIndex: number) => {
    //         return (
    //           key !== 'timeStamp' && (
    //             <span
    //               className={'cellStyle'}
    //               id={`cell-id-${rowIndex}-${cellIndex}`}
    //               key={`cell-key-${rowIndex}-${cellIndex}`}
    //             >
    //               {row[key]}
    //             </span>
    //           )
    //         )
    //       })}
    //     </div>
    //   ))}
    // </div>
  )
}
