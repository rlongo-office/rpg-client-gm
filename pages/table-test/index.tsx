import * as React from 'react'
import DataTable from '../../components/DataTable/DataTable';
import mockedTableData from '../../data/rows';
import creatures from '../../data/collections/creatures.json'
import {parseDataForTable,iterateObjEntries,getObjValue} from '../../components/DataTable/TableBody/utils'
import TableInputForm from '../../components/TableInputForm';
import { useAppContext } from '../../state/gameState';

interface AnyObject {
    [key: string]: any
  }

  interface AnyObjArray extends Array<AnyObject>{}

  const renderHeader = (row:Object)=> {
        const keys = Object.keys(row)
        keys.map(key=>{
            return (
                <span className="cellStyle" key={`row-${key}`} >{key}</span>
                )
        })
  }

  const callParent = (event:any)=>{
      const recID = event.currentTarget
      console.log(recID)
  }

  const renderFunction = (rows:Array<Object>,page:number,pageSize:number,header:string,selectRows:Function)=>{
        const callBack = selectRows
        let tableSize:number = rows.length
        let pageStart:number = page === 1 ? 0 : (page-1) * pageSize
        let pageEnd = pageStart + pageSize <= tableSize ? pageStart + pageSize : tableSize;
        const pageOfRows = rows.slice(pageStart,pageEnd);
        return (
            <>
            {
                pageOfRows.map( (row: any, rowIndex: number)=>{
                    return (
                        <div className = "rowStyle" id="row" key={`row-${rowIndex}`} onClick={callBack}>
                            {
                                Object.keys(row).map((cell: any, cellIndex: number)=>{
                                    return (
                                            <span className="cellStyle" key={`cell-${cellIndex}`} >{row[cell]}</span>
                                            )
                                }) 
                            }
                        </div>
                    )
                })
            }
            </>
        )
        
    }


function TableTest() {

    const contextData = useAppContext() //pulled from the GameState: AppContext we created
    const data = parseDataForTable(contextData,["name","type","hit_dice","challenge_rating"])
    const index = 3

    const configObj = {
        sortColumns:[0,1,2,3,4],
        header:"keys",
        stripe:true,
        border:true,
        pageSize:15,
        selectRows: callParent,
        renderRows:renderFunction,
        data: data
    }
    
React.useEffect(()=>{
},[])


    return (
      <div>
          <div className="dataPage">
            <div className="itemHeader">Header</div>
            <div className="itemLeft">
                <h2>Creature Table</h2>
                <DataTable config={configObj}          
                />
            </div>
            <div className="itemRight">
                <h2>Creature Table</h2>
                <DataTable config={configObj}          
                />
            </div>
          </div>
          <div>
            <TableInputForm index={index} source={contextData} />
            </div>
       </div>
    );


}

export default TableTest;