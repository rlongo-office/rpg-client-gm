import * as React from 'react'
import DataTable from '../../components/DataTable/DataTable'
import truncatedArray from '../../data/collections/truncatedArray.json'
import {parseDataForTable} from '../../components/DataTable/TableBody/utils'
import TableInputForm from '../../components/TableInputForm'
import {useAppContext} from '../../context/AppProvider'
import ActorsTable from "../../components/DataTable/ActorsTable"

interface AnyObject {
  [key: string]: any
}

const renderHeader = (row: Object) => {
  const keys = Object.keys(row)
  keys.map(key => {
    return (
      <span className="cellStyle" key={`row-${key}`}>{key}</span>
    )
  })
}

function TableTest() {
  const {creatures, creaturePageIDS, actors, setActors} = useAppContext()
  const data = parseDataForTable(creatures, ["name", "type", "hit_dice", "challenge_rating"])
  const [currentRecord, setCurrentRecord] = React.useState<object>({})

  const configObj = {
    sortColumns: [0, 1, 2, 3, 4],
    header: "keys",
    stripe: true,
    border: true,
    pageSize: 15,
    data
  }

  React.useEffect(() => {
    if (creaturePageIDS != -1) {
      setCurrentRecord(creatures[creaturePageIDS])
    }
  }, [creaturePageIDS])

  // THIS IS THE PART THAT WAS ADJUSTED
  // React.useEffect(() => {
  //if (actors.length > 0) {
    // setActors(parseDataForTable(actors, ["name", "type", "hit_dice", "challenge_rating"]))
  //}
  // }, [actors])

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
          <ActorsTable />
        </div>
      </div>
      <div>
        <TableInputForm source={currentRecord}/>
      </div>
    </div>
  );
}

export default TableTest;
