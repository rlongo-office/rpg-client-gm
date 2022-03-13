import * as React from 'react'
import DataTable from './DataTable'
import { useAppContext } from '../../context/AppProvider'
import { parseDataForTable, addIndexColumn } from '../../components/DataTable/TableBody/utils'

interface TableConfig {
  tableID: string
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
 * This is a wrapper for the DataTable and contains the configuration for child table component.
 * As such this component pulls in config and data contexts.
 *
 * @constructor
 */
function CreaturesTable() {

  /*   const parsedActors = parseDataForTable(creatures, [
    'name',
    'type',
    'hit_dice',
    'challenge_rating',
  ]) */

/*   const setTableData = () => {
    let newConfig: TableConfig = tableConfig.creatureConfig
    newConfig = {
      ...newConfig,
      data: addIndexColumn(
        parseDataForTable(creatures, ['name', 'type', 'hit_dice', 'challenge_rating'])
      ),
    }
    setTableConfig({ ...tableConfig, creatureConfig: newConfig })
  } */

  return (
    <>
      <h2>Creatures Table</h2>
      <DataTable tableID={'creatureConfig'} />
    </>
  )
}

export default CreaturesTable
