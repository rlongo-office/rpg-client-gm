import { useAppContext } from '../../../context/AppProvider'
import * as React from 'react'
import * as Types from '../../../types/rpg-types'

interface RowsProps {
    rows: Array<object>,
    page: number,
    pageSize:number,
    header:string
}

export default function Rows({rows,page,pageSize,header}:RowsProps) {
    const {state:{creatures}, dispatch} = useAppContext()
    let content: Array<React.ReactNode> = []
    let tableSize:number = rows.length
    let pageStart:number = page === 1 ? 0 : (page-1) * pageSize
    let pageEnd = pageStart + pageSize <= tableSize ? pageStart + pageSize : tableSize;
    const pageOfRows = rows.slice(pageStart,pageEnd);
    
    const setRecID = (event:any)=>{
        let recID = event.currentTarget.children[0].innerText
        recID = parseInt(recID)
        dispatch(Types.SET_CREATURE_ID,recID)
    }

    return pageOfRows.map((row:any, rowIndex: number)=>{
        let rowChildren:JSX.Element[] = []
        let rowProps:Object = {
            className:"rowStyle",
            id:`row-id-${rowIndex}`,
            onClick:setRecID
        }

        return (
            <div {...rowProps} key={`row-key-${rowIndex}`}>
                {
                    Object.keys(row).map((key: any, cellIndex: number) => {
                        let cellProps:Object = {
                            className:"cellStyle",
                            id:`cell-id-${rowIndex}.${cellIndex}`,
                        }

                        return <span {...cellProps} key={`cell-key-${rowIndex}.${cellIndex}`}>{row[key]}</span>
                    })
                }
            </div>
        )

        // let rowDiv = React.createElement("div",rowProps,rowChildren)
        // content.push(rowDiv)
    })

    // return content;
}
