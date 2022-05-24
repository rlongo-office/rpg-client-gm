import { useContext } from 'react'
import creaturesCollection from '../data/collections/creatures.json'
/* import creaturesData from '../data/collections/creature-slice.json'
import itemsData from '../data/collections/items.json'
import playersData from '../data/collections/players.json'
import spellsData from '../data/collections/spells.json'
import storylinesData from '../data/collections/storylines.json' */
import * as React from 'react'
import { parseDataForTable, createObjID } from '../components/DataTable/TableBody/utils'
import gameService, { apiUtils } from '../utils/game-service'
import * as types from '../types/rpg-types'
import gameObject from '../data/collections/game-object'

// eslint-disable-next-line no-unused-vars

const AppContext = React.createContext<any | undefined>(undefined)

export function AppProvider({ children }: types.AppProviderProps) {
  const [account, setAccount] = React.useState({ user: 'jsnrice', password: 'password' })
  const [isConnected, setIsConnected] = React.useState<boolean>()
  const [wsSocket, setWSSocket] = React.useState<any>({})
  const [stompClient, setStompClient] = React.useState<any>(null)
  const [creatures, setCreatures] = React.useState<types.AnyObject[]>(creaturesCollection)
  const [actors, setActors] = React.useState<types.AnyObject[]>([])
  const [game, setGame] = React.useState<types.GameObject>(gameObject)
  const [messages, setMessages] = React.useState<types.messageType[]>([])

  const sharedTableConfig = {
    sortColumns: [0, 1, 2, 3, 4],
    header: ['Name', 'Type', 'Hit Dice', 'Challenge Rating'],
    filtered: ['index', 'name', 'type', 'hit_dice', 'challenge_rating'],
    stripe: true,
    border: true,
    pageSize: 15,
    current: 1,
    tableSpan: 8,
    lowerBound: 1,
    upperBound: 8,
    selected: [],
  }

  const parsedCreaturesData = parseDataForTable(creatures, sharedTableConfig.filtered)

  const [tableConfig, setTableConfig] = React.useState<types.ConfigObject>({
    creatureConfig: {
      ...sharedTableConfig,
      tableID: 'creatureConfig',
      data: parsedCreaturesData,
      filteredData: parsedCreaturesData,
    },

    actorConfig: {
      ...sharedTableConfig,
      tableID: 'actorConfig',
      data: [],
      filteredData: [],
    },
    itemConfig: {
      ...sharedTableConfig,
      tableID: 'itemConfig',
      data: [],
      filteredData: [],
    },
    storylineConfig: {
      ...sharedTableConfig,
      tableID: 'storylineConfig',
      data: [],
      filteredData: [],
    },
    spellConfig: {
      ...sharedTableConfig,
      tableID: 'spellConfig',
      data: [],
      filteredData: [],
    },
    playerConfig: {
      ...sharedTableConfig,
      tableID: 'playerConfig',
      data: [],
      filteredData: [],
    },
    encounterConfig: {
      ...sharedTableConfig,
      tableID: 'encounterConfig',
      data: [],
      filteredData: [],
    },
  })

  const reducer = async (type: string, payload: any) => {
    let returnObj: types.AnyObject[] = []
    let parsedData: types.AnyObject[] = []
    switch (type) {
      case 'addActor':
        const newActors: types.AnyObject[] = [...actors, createObjID(actors, payload)]
        setActors(newActors)
        parsedData = parseDataForTable(newActors, sharedTableConfig.filtered)
        setTableConfig({
          ...tableConfig,
          actorConfig: { ...tableConfig.actorConfig, data: parsedData, filteredData: parsedData },
        })
        break
      case 'getGameObject':
        returnObj = await apiUtils.getGameObject()
        console.log(returnObj)
        setCreatures(returnObj)
        //before parsing we need to parse the array of strings
        parsedData = parseDataForTable(returnObj, sharedTableConfig.filtered)
        setTableConfig({
          ...tableConfig,
          creatureConfig: {
            ...tableConfig.creatureConfig,
            data: parsedData,
            filteredData: parsedData,
          },
        })
        break
      case 'setGameObject':
        returnObj = await apiUtils.setGameObject(payload)
        break

      default:
        break
    }
  }

  //
  const gblMsgHandler = (message: types.messageType) => {
    switch (message.type) {
      case 'private':
        setMessages([...messages, message])
        break
      default:
        break
    }
  }

  const value = React.useMemo(
    () => ({
      game,
      setGame,
      creatures,
      setCreatures,
      actors,
      setActors,
      tableConfig,
      setTableConfig,
      gblMsgHandler,
      account,
      setAccount,
      messages,
      setMessages,
      isConnected,
      setIsConnected,
      stompClient,
      setWSSocket,
      setStompClient,
    }),
    [creatures, actors, tableConfig, game, account, isConnected, stompClient, messages]
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
