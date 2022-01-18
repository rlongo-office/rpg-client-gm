import * as React from 'react'
import DataTable from '../../components/DataTable/DataTable';
import mockedTableData from '../../data/rows';


const rowStyle = {
    display: 'grid',
    gridTemplateColumns: '2fr 2fr 1fr 6fr',
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
            renderRows={ (rows:Array<Object>,page:number,pageSize:number)=>{
                let size:number = rows.length
                let pageStart:number = page * pageSize
                let pageEnd = pageStart + pageSize <= size ? pageStart + pageSize : size;
                const pageOfRows = rows.slice(pageStart,pageEnd);

                return (
                    <>
                    {
                        pageOfRows.map( (row: any, rowIndex: number)=>{
                            return (
                                <div style = {rowStyle} id="row" key={`row-${rowIndex}`}>
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