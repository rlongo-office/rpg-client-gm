import * as React from 'react'


interface TableProps {
    config: any
    renderRows: Function
    rows: Array<React.ReactNode>
}

const gridStyle = {
    margin: '40px',
    border: '5px solid pink'
  };
  const rowStyle = {
    fontSize: '15px',
    textAlign: 'center'
  };


function DataTable({
    config,
    renderRows, 
    rows}: TableProps
    ) {
    return (
      <div>
          {rows.length > 0 ? renderRows(rows) : <span>No Data</span>}
      </div>  
    );
}

export default DataTable;
