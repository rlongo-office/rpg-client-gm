import * as React from 'react'
import DataTable from '../../components/DataTable/DataTable';
import mockedTableData from '../../data/rows';
import creatures from '../../data/collections/creatures.json'
import {parseDataForTable,renderTableRows} from '../../components/DataTable/TableBody/utils'
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
      const recID = event.currentTarget.children[0].innerText
      
      console.log(recID)
  }

function TableTest() {

    const contextData = useAppContext() //pulled from the GameState: AppContext we created
    const data = parseDataForTable(contextData,["name","type","hit_dice","challenge_rating"])
    const index = 3
    const source = creatures

    const [currentRecord, setCurrentRecord] = React.useState<object>({})

    const getRecordID = (event:any)=>{
        let recID = event.currentTarget.children[0].innerText
        recID = parseInt(recID)
        setCurrentRecord(contextData[recID])
        console.log(recID)
    }

    const configObj = {
        sortColumns:[0,1,2,3,4],
        header:"keys",
        stripe:true,
        border:true,
        pageSize:15,
        selectRows: getRecordID,
        renderRows:renderTableRows,
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
            <TableInputForm source={currentRecord} />
            </div>
       </div>
    );


}

export default TableTest;