import {useContext} from 'react'
import creaturesData from '../data/collections/creatures.json'
import * as React from 'react'
import {parseDataForTable} from "../components/DataTable/TableBody/utils";

interface AnyObject {
  [key: string]: any
}

type AppProviderProps = {
  children: React.ReactNode
}

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

interface ConfigObject {
  [key: string]: TableConfig
}

const AppContext = React.createContext<any | undefined>(undefined)

export function AppProvider({children}: AppProviderProps) {
  const [creatures, setCreatures] = React.useState(creaturesData)
  const [actors, setActors] = React.useState([])

  const sharedTableConfig = {
    sortColumns: [0, 1, 2, 3, 4],
    header: ['Name', 'Type', 'Hit Dice', 'Challenge Rating'],
    filtered:['_id.$oid','name', 'type', 'hit_dice', 'challenge_rating'],
    stripe: true,
    border: true,
    pageSize: 15,
    current: 1,
    tableSpan: 8,
    lowerBound: 1,
    upperBound: 8,
    selected: [1],
  }

  const [tableConfig, setTableConfig] = React.useState<ConfigObject>({
    creatureConfig: {
      ...sharedTableConfig,
      tableID: 'creatureConfig',
      data: parseDataForTable(creaturesData, sharedTableConfig.filtered),
    },
    actorConfig: {
      ...sharedTableConfig,
      tableID: 'actorConfig',
      data: [],
    },
  })

  const value = React.useMemo(
    () => ({
      creatures,
      setCreatures,
      actors,
      setActors,
      tableConfig,
      setTableConfig,
    }),
    [creatures, actors, tableConfig]
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext() {
  const store = useContext(AppContext)
  if (!store) {
    throw 'Store is not defined'
  }
  return store
}

export default { AppProvider, useAppContext }
