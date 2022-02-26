import * as React from 'react'
import DataTable from "./DataTable"
import {useAppContext} from "../../context/AppProvider";
import {parseDataForTable,addIndexColumn} from '../../components/DataTable/TableBody/utils'

interface configObj {
  sortColumns: Array<number>
  header: Array<string>
  stripe: boolean
  border: boolean
  pageSize: number
  data: Array<AnyObject>
}

interface AnyObject {
  [key: string]: any
}
/**
 * This is a wrapper for the DataTable and contains the configuration for actors.
 * As such this component pulls in actors context.
 *
 * @constructor
 */
function ActorsTable() {

  const {actors} = useAppContext()
  const [config, setConfig] = React.useState<configObj>({
    sortColumns: [0, 1, 2, 3, 4],
    header: ["id","name", "type", "hit_dice", "challenge_rating"],
    stripe: true,
    border: true,
    pageSize: 15,
    data: []
    //headerObject which includes the columns passed for header Component
  });

  const parsedActors = parseDataForTable(actors, ["name", "type", "hit_dice", "challenge_rating"])

  React.useEffect(() => {
    let actorsTableConfig = {
      sortColumns: [0, 1, 2, 3, 4],
      header: ["id","name", "type", "hit_dice", "challenge_rating"],
      stripe: true,
      border: true,
      pageSize: 15,
      data: addIndexColumn(parseDataForTable(actors, ["name", "type", "hit_dice", "challenge_rating"]))
      //headerObject which includes the columns passed for header Component
    }
    setConfig(actorsTableConfig)
  }, [actors])

  return (
    <>
      <h2>Actors Table</h2>
      <DataTable config={config}/>
    </>
  )
}

export default ActorsTable
