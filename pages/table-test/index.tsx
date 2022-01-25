import * as React from 'react'
import DataTable from '../../components/DataTable/DataTable';
import mockedTableData from '../../data/rows';


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

const configObj = {
    sortColumns:[0,1,2,3,4],
    header:"keys",
    stripe:true,
    border:true,
    pageSize:10,
    renderRows:renderFunction,
    data: mockedTableData
}

function TableTest() {

    return (
      <div>
          <h1>Data Table Page</h1>
         <DataTable
            config={configObj}          
         />
      </div>  
    );


}

export default TableTest;