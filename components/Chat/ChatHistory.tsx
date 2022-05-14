import * as React from 'react'
import { useAppContext } from '../../context/AppProvider'




export default function ChatHistory(){
    const {messages} = useAppContext()


    React.useEffect(() => {
      }, [messages])

    return (
        <div className={'chatTableWrapper'}>
          {messages.map((row: any, rowIndex: number) => (
            <div
              id={`row-id-${row.timeStamp}`}
              key={`row-key-${rowIndex}`}
            >
              {Object.keys(row).map((key: any, cellIndex: number) => {
                return (
                  key !== 'timeStamp' && (
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
        </div>
      )

}