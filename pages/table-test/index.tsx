import * as React from 'react'
import DataTable from '../../components/DataTable/DataTable'
import truncatedArray from '../../data/collections/truncatedArray.json'
import { parseDataForTable } from '../../components/DataTable/TableBody/utils'
import TableInputForm from '../../components/TableInputForm'
import { useAppContext } from '../../context/AppProvider'
import ActorsTable from '../../components/DataTable/ActorsTable'
import CreaturesTable from '../../components/DataTable/CreaturesTable'

interface AnyObject {
  [key: string]: any
}

const renderHeader = (row: Object) => {
  const keys = Object.keys(row)
  keys.map(key => {
    return (
      <span className="cellStyle" key={`row-${key}`}>
        {key}
      </span>
    )
  })
}

function TableTest() {
  const { creatures, tableConfig, actors, setActors } = useAppContext()
  const data = parseDataForTable(creatures, ['name', 'type', 'hit_dice', 'challenge_rating'])
  const [currentRecord, setCurrentRecord] = React.useState<object>({})

  const configObj = {
    sortColumns: [0, 1, 2, 3, 4],
    header: ['id', 'name', 'type', 'hit_dice', 'challenge_rating'],
    stripe: true,
    border: true,
    pageSize: 15,
    data,
  }

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
      <div>{/*<TableInputForm source={"creatureConfig"} target={"actorConfig"}/>*/}</div>
    </div>
  )
}

export default TableTest
