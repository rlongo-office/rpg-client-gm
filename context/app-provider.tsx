import { useContext } from 'react'
import creaturesCollection from '../data/collections/creatures.json'
import playersData from '../data/collections/players.json'
import playerUIBP from '../data/collections/maps/bp-player-dnd-5-1.0.json'
import textData from '../data/collections/textMessages.json'
import loreData from '../data/collections/loreMessages.json'
import * as React from 'react'
import { parseDataForTable, createObjID } from '../utils/utils'
import * as types from '../types/rpg-types'
import gameObject from '../data/collections/game-object'
import apiUtils from '../utils/game-service'
import * as imageDump from '../data/mapImage'

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
  const [players, setPlayers] = React.useState<types.AnyObject[]>(playersData)
  const [playerBP, setPlayerBP] = React.useState<types.AnyObject>(playerUIBP)
  const [textHistory, setTextHistory] = React.useState<types.textMessage[]>(textData)
  const [loreMsgData, setLoreMsgData] = React.useState<types.textMessage[]>(loreData)
  const [images, setImages] = React.useState<string[]>([imageDump.bigImage])
  const [devWidth, setDevWidth] = React.useState(375)
  const [devHeight, setDevHeight] = React.useState(700)

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
  //The following function and useEffect added to address responsive layout needs across
  //different devices.  I needed both width and length of window to plan component layout

  const isMobile = () => {
    var result = false
    if (window.PointerEvent && 'maxTouchPoints' in navigator) {
      // if Pointer Events are supported, just check maxTouchPoints
      if (navigator.maxTouchPoints > 0) {
        result = true
      }
    } else {
      // no Pointer Events...
      if (window.matchMedia && window.matchMedia('(any-pointer:coarse)').matches) {
        // check for any-pointer:coarse which mostly means touchscreen
        result = true
      } else if (window.TouchEvent || 'ontouchstart' in window) {
        // last resort - check for exposed touch events API / event handler
        result = true
      }
    }
    return result
  }

  const handleWindowResize = () => {
    setDevWidth(window.innerWidth)
    setDevHeight(window.innerHeight)
    console.log('w: ' + window.innerWidth + ' h: ' + window.innerHeight)
  }

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      let mobile = isMobile()
      if (mobile) {
        window.addEventListener('resize', handleWindowResize)
        return () => window.removeEventListener('resize', handleWindowResize)
      }
    }
  }, [])

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
      players,
      playerBP,
      textHistory,
      loreMsgData,
      images,
      devHeight,
      devWidth,
    }),
    [
      creatures,
      actors,
      tableConfig,
      game,
      account,
      isConnected,
      stompClient,
      messages,
      players,
      textHistory,
      loreMsgData,
      images,
      devHeight,
      devWidth,
    ]
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
