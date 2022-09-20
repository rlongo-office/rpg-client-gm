import * as React from 'react'
import TableInputForm from '../../components/table-input-form'
import ActorsTable from '../../components/data-table/actors-table'
import CreaturesTable from '../../components/data-table/creatures-table'
import StatComponentSimple from '../../components/data-table/stat-component-simple/stat-component-simple'

function TableTest() {
  return (
    <div>
      <div className="dataPage">
        <div className="itemHeader">Header</div>
        <div className="itemLeft">
          <CreaturesTable />
        </div>
        <div className="itemRight">
          <ActorsTable />
        </div>
      </div>
      <div>
        <TableInputForm source={'creatureConfig'} target={'actorConfig'} />
      </div>
    </div>
  )
}

export default TableTest
