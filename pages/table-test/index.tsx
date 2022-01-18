import * as React from 'react'
import DataTable from '../../components/DataTable/DataTable';
import mockedTableData from '../../data/rows';


const rowStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 2fr',
  };

  const cellStyle = {
      borderColor: 'black',
      borderStyle: 'solid',
      borderWidth: '1px',
      paddingLeft: '10px'
  };

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
                                <div className="rowStyle" id="row" key={`row-${rowIndex}`}>
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
                
            }}
            rows={mockedTableData}
         />
      </div>  
    );


}

export default TableTest;