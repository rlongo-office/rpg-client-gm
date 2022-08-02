import * as React from 'react'
import TableInputForm from '../../components/TableInputForm'
import PlayerContainer from '../../components/PlayerContainer'
import ActorsTable from '../../components/DataTable/ActorsTable'
import CreaturesTable from '../../components/DataTable/CreaturesTable'
import StatComponent from '../../components/DataTable/StatComponent/StatComponent'

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
      <div>
        <StatComponent />
      </div>
    </div>
  )
}

export default TableTest
