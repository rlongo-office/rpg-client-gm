import { useContext } from 'react'
import creaturesCollection from '../data/collections/creatures.json'
import creaturesData from '../data/collections/creature-slice.json'
import itemsData from '../data/collections/items.json'
import playersData from '../data/collections/players.json'
import spellsData from '../data/collections/spells.json'
import storylinesData from '../data/collections/storylines.json'
import * as React from 'react'
import { parseDataForTable, createObjID } from '../components/DataTable/TableBody/utils'
import gameService, { apiUtils } from '../utils/game-service'
import * as types from '../types/rpg-types'
import SockJS from 'sockjs-client'
import webStompClient from 'webstomp-client'

// define the game service resources here
let _isConnected = false
let _socket = null
let _stompClient: any = null

// eslint-disable-next-line no-unused-vars
const _eventHandlers = {
  connect: [], // functions to call when a connect event occurs
  disconnect: [],
  'receive-message': [],
  load: [],
}

// eslint-disable-next-line no-unused-vars

const AppContext = React.createContext<any | undefined>(undefined)

export function AppProvider({ children }: types.AppProviderProps) {
  const [account, setAccount] = React.useState({ user: '', password: '' })
  const [inboundMsg, setInboundMsg] = React.useState<any>(null)
  const [isConnected, setIsConnected] = React.useState<boolean>()
  const [wsSocket, setWSSocket] = React.useState<any>({})
  const [stompClient, setStompClient] = React.useState<any>({})
  const [creatures, setCreatures] = React.useState<types.AnyObject[]>(creaturesCollection)
  const [actors, setActors] = React.useState<types.AnyObject[]>([])
  const [game, setGame] = React.useState<types.AnyObject[]>([])
  const [messages, setMessages] = React.useState<types.AnyObject[]>([])

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

  const connect = async (username: string, password: string) => {
    let newSocket = new SockJS('http://localhost:8080/game-app')
    setWSSocket(newSocket)
    let newStompClient = webStompClient.over(newSocket)
    setStompClient(newStompClient)
    await newStompClient.connect(
      { username, password },
      (frame: any) => connectionSuccess(frame, newStompClient),
      connectionError
    )
  }

  const connectionSuccess = (frame: any, client: any) => {
    console.log(frame)
    setIsConnected(true)
    // register ''default' message channel listeners
    client.subscribe('/topic/chat', (message: types.messageType) => messageHandler(message))
    client.subscribe('/user/queue/message', (message: types.messageType) => messageHandler(message))
  }

  const connectionError = (error: any) => {
    console.log(error)
    setIsConnected(false)
  }

  const sendMessage = (msg: types.messageType) => {
    let msgString = JSON.stringify(msg)
    console.log('sendMessage called')
    console.log('isConnected is ' + isConnected)
    const { type, body, dest } = msg
    if (stompClient && isConnected) {
      switch (type) {
        case 'party':
          stompClient.send('/app/chat', msgString, {})
          break
        case 'private':
          stompClient.send('/app/messages', msgString, {})
          break
      }
    }
  }

  const messageHandler = (message: any) => {
    setInboundMsg(message)
    // fire the 'connect' callbacks
    /*     let msg = JSON.parse(message.body)
    const { id, type, sender, timeStamp, body, dest } = msg
    console.log('message Handler called')
    switch (type) {
      case 'party':
        //console.log('we got a PARTY message of ' + message.body)
        break
      case 'private':
        //console.log('we got a PRIVATE message of ' + message.body)
        //reducer('addMessage', msg)
        setMessages([...messages,msg])
        break
      case 'character':
        break
      case 'image':
        break
      case 'action':
      case 'lore':
        break
    } */
  }

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
      case 'addMessage':
        //const newMsgs:types.messageType[] = messages
        let newMsgs: types.AnyObject[] = Array.from(messages)
        //newMsgs.push(payload)
        newMsgs.push(payload)
        console.log(newMsgs)
        setMessages(newMsgs)
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

  React.useEffect(() => {
    if (inboundMsg) {
      const msg = JSON.parse(inboundMsg.body)
      console.log('there is a message to process' + JSON.parse(inboundMsg.body))
      setMessages([...messages,msg])
    }
  }, [inboundMsg])

  React.useEffect(() => {
    console.log('checking stuff out')
  }, [isConnected, stompClient, wsSocket,messages])

  const value = React.useMemo(
    () => ({
      creatures,
      setCreatures,
      actors,
      setActors,
      tableConfig,
      setTableConfig,
      reducer,
      account,
      setAccount,
      messages,
      setMessages,
      connect,
      sendMessage,
      isConnected,
      stompClient,
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
