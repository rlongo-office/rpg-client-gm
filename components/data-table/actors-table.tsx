import * as React from 'react'
import DataTable from './data-table'
import { useAppContext } from '../../context/app-provider'
import { parseDataForTable, addIndexColumn } from '../../utils/utils'

interface TableConfig {
  sortColumns: Array<number>
  header: Array<string>
  stripe: boolean
  border: boolean
  pageSize: number
  current: number
  tableSpan: number
  lowerBound: number
  upperBound: number
  selected: Array<number>
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
  const { actors, tableConfig, setTableConfig } = useAppContext()

  //const parsedActors = parseDataForTable(actors, ["name", "type", "hit_dice", "challenge_rating"])
  const setTableData = () => {
    let newConfig: TableConfig = tableConfig.actorConfig
    newConfig = {
      ...newConfig,
      data: addIndexColumn(
        parseDataForTable(actors, ['name', 'type', 'hit_dice', 'challenge_rating'])
      ),
    }
    setTableConfig({ ...tableConfig, actorConfig: newConfig })
  }

  React.useEffect(() => {}, [])

  React.useEffect(() => {}, [actors])

  /*   React.useEffect(() => {
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
  }, [actors]) */

  return (
    <>
      <h2>Actors Table</h2>
      <DataTable tableID={'actorConfig'} />
    </>
  )
}

export default ActorsTable
