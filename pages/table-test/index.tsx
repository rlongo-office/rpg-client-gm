import * as React from 'react'
import DataTable from '../../components/DataTable/DataTable';
import truncatedArray from '../../data/collections/truncatedArray.json'
import {parseDataForTable,renderTableRows} from '../../components/DataTable/TableBody/utils'
import TableInputForm from '../../components/TableInputForm';
import { useAppContext } from '../../context/AppProvider'

interface AnyObject {
    [key: string]: any
  }

const renderHeader = (row:Object)=> {
        const keys = Object.keys(row)
        keys.map(key=>{
            return (
                <span className="cellStyle" key={`row-${key}`} >{key}</span>
                )
        })
  }

function TableTest() {

    const {state:{creatures}, dispatch} = useAppContext()
    const data = parseDataForTable(creatures,["name","type","hit_dice","challenge_rating"])
    const [currentRecord, setCurrentRecord] = React.useState<object>({})

    const getRecordID = (event:any)=>{
        let recID = event.currentTarget.children[0].innerText
        recID = parseInt(recID)
        setCurrentRecord(creatures[recID])
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
    const onClickFunction=(e:any)=>{
        dispatch({
            type: "ADD_ACTOR",
            payload: {name:"Bubba",hitpoints:30}
          })
    }
    
React.useEffect(()=>{
},[])

    return (
      <div>
          <button onClick={onClickFunction}>Let us try a Dispatch</button>
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