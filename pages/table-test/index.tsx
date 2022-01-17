import * as React from 'react'
import DataTable from '../../components/DataTable/DataTable';
import mockedTableData from '../../data/rows';

function TableTest() {
    return (
      <div>
          <h1>Data Table Page</h1>
         <DataTable
            config={{}}
            //  
            renderRows={ (rows:Array<Object>)=>{
                return (
                    <>
                    {
                        rows.map( (row: any, rowIndex: number)=>{
                            return (
                                <div id="row" key={`row-${rowIndex}`}>
                                    {
                                        Object.keys(row).map((cell: any, cellIndex: number)=>{
                                            return (
                                                    <span key={`row-${cellIndex}`} >{row[cell]}</span>
                                                    )
                                        }) 
                                    }
                                </div>
                            )
                        })
                    }
                    </>
                )
                
            }}
            rows={mockedTableData}
         />
      </div>  
    );


}

export default TableTest;