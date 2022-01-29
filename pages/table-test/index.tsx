import * as React from 'react'
import DataTable from '../../components/DataTable/DataTable';
import mockedTableData from '../../data/rows';
import creatures from '../../data/collections/creatures.json'
import {parseDataForTable,iterateObjEntries,getObjValue} from '../../components/DataTable/TableBody/utils'
import TableInpuForm from '../../components/TableInputForm'
import TableInputForm from '../../components/TableInputForm';

const rowStyle = {
    display: 'grid',
    gridTemplateColumns: '1 fr 2fr 2fr 1fr 3fr',
  };

  const cellStyle = {
      borderColor: 'black',
      borderStyle: 'solid',
      borderWidth: '1px',
      paddingLeft: '10px'
  };

  const renderHeader = (row:Object)=> {
        const keys = Object.keys(row)
        keys.map(key=>{
            return (
                <span className="cellStyle" key={`row-${key}`} >{key}</span>
                )
        })
  }

  const renderFunction = (rows:Array<Object>,page:number,pageSize:number,header:string)=>{
        let tableSize:number = rows.length
        let pageStart:number = page === 1 ? 0 : (page-1) * pageSize
        let pageEnd = pageStart + pageSize <= tableSize ? pageStart + pageSize : tableSize;
        const pageOfRows = rows.slice(pageStart,pageEnd);
        return (
            <>
            {
                pageOfRows.map( (row: any, rowIndex: number)=>{
                    return (
                        <div className = "rowStyle" id="row" key={`row-${rowIndex}`}>
                            {
                                Object.keys(row).map((cell: any, cellIndex: number)=>{
                                    return (
                                            <span className="cellStyle" key={`row-${cellIndex}`} >{row[cell]}</span>
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
    const data = parseDataForTable(creatures,["name","type","hit_dice","challenge_rating"])
    const configObj = {
        sortColumns:[0,1,2,3,4],
        header:"keys",
        stripe:true,
        border:true,
        pageSize:10,
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
            <TableInputForm />
       </div>
    );


}

export default TableTest;