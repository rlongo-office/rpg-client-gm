import { useContext, useState,useEffect,useRef } from 'react'
import creaturesCollection from '../data/collections/creatures.json'
import playersData from '../data/collections/players.json'
import playerUIBP from '../data/collections/maps/bp-player-dnd-5-1.0.json'
import textData from '../data/collections/textMessages.json'
import loreData from '../data/collections/loreMessages.json'
import * as React from 'react'
import gameObject from '../data/collections/game-object'
import { mapImage } from '../data/mapImage'
import { createObjID, parseDataForTable } from '@utils/utils'
import * as types from '../types/rpg-types'

interface gameState {
  game: types.GameObject
  myUser:string
  users:string[]
  messages:types.messageType[]
}

export const AppContext = React.createContext<any | undefined>(undefined)

export function AppProvider({ children }: types.AppProviderProps) {
  //useRef apparently doesn't cause a rerender like changes in useState values
  const [appSocket,setAppSocket] = useState<WebSocket>(null);
  const [myUser, setMyUser] = useState<string>("")
  const [users, setUsers] = useState<string[]>([])
  const [serverURL,setServerURL] = useState<string>('ws://localhost:8000')
  const [game, setGame] = useState<types.GameObject>(gameObject)
  const [account, setAccount] = React.useState({ user: 'jsnrice', password: 'password' })
  const [isConnected, setIsConnected] = useState(false)
  //While game object does have the users stored in the actor array, to avoid rerenders every time the gameObject
  //changes, I will check for game object to change here, and update the users only when
  const [creatures, setCreatures] = useState<types.AnyObject[]>(creaturesCollection)
  //Actors are any entity in the world  whether NPC (GM) or player controlled
  const [actors, setActors] = useState<types.AnyObject[]>([])

  const [messages, setMessages] = useState<types.messageType[]>([])
  const [players, setPlayers] = useState<types.AnyObject[]>(playersData)
  const [playerBP, setPlayerBP] = useState<types.AnyObject>(playerUIBP)
  //Those exchanged websocket messages of type group, private, party, or game texts
  const [textHistory, setTextHistory] = useState<types.textMessage[]>(textData)
  //Those exchanged websocket messages resulting from 'lore' or 'story' searches
  const [loreMsgData, setLoreMsgData] = useState<types.textMessage[]>(loreData)
  const [images, setImages] = useState<string>(mapImage)
  const [devWidth, setDevWidth] = useState(375)
  const [devHeight, setDevHeight] = useState(700)
  const [imgConfig, setImgConfig] = useState({
    img: '',
    imgTOP: 0,
    imgLEFT: 0,
    offsetX: 0,
    offsetY: 0,
    isFirstPress: true,
    isDragging: false,
    isScaling: false,
    divHeight: 350,
    divWidth: 350,
    topLimit: 0,
    leftLimit: 0,
    isLoaded: true,
    oldMouseX: 0,
    oldMouseY: 0,
    touchDist: 0,
    accLimit: 4,
    scaleInc: 0.025,
  })
  const [gameStore,setGameStore] = useState<gameState>({
    game:game,
    users:users,
    myUser:myUser,
    messages:messages
  })
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

  /*   const reducer = async (type: string, payload: any) => {
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
  } */

/*   const gblMsgHandler = React.useCallback(
    (message: types.messageType) => {
      switch (message.type) {
        case 'private':
          setMessages([...messages, message])
          break
        default:
          break
      }
    },
    [messages]
  ) */

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

  /* Update local storage when state changes*/
  useEffect(() => {
    localStorage.setItem('gameStore', JSON.stringify(gameStore));
  }, [gameStore]);


  /*Make sure we have a valid window object before we add a window level listener */
  useEffect(() => {
    if (typeof window !== 'undefined') {
      let mobile = isMobile()
      if (mobile) {
        window.addEventListener('resize', handleWindowResize)
        return () => {
          window.removeEventListener('resize', handleWindowResize)
      }
      }
    }
  }, [])

  useEffect(()=>{
    const savedState = localStorage.getItem('gameStore')
    if (savedState){
      setGameStore(JSON.parse(savedState))
    }
  },[])

  //When  game object update user listing needed
  useEffect(() => {
    debugger
    //check if user listing has changed
    if (!game || !game.players) {
      return
    }
    console.log('app-provider: useEffect for game called')
    setUsers(prevUsers => {
      const newUsers = game.players
        .map(player => player.name)
        .filter(user => !prevUsers.find(o => o === user))
      console.log(newUsers)
      return [...prevUsers, ...newUsers]
    })
  }, [game])

  useEffect(() => {
    setGameStore({
      game:game,
      users:users,
      myUser:myUser,
      messages:messages
    })

  }, [game,users,myUser,messages])


  const value = React.useMemo(
    () => ({
      gameStore,
      game,
      users,
      myUser,
      setMyUser,
      setUsers,
      setGame,
      creatures,
      setCreatures,
      actors,
      setActors,
      tableConfig,
      setTableConfig,
      account,
      setAccount,
      messages,
      setMessages,
      isConnected,
      setIsConnected,
      players,
      playerBP,
      textHistory,
      loreMsgData,
      images,
      devHeight,
      devWidth,
      imgConfig,
      serverURL,
      appSocket,
      setAppSocket
    }),
    [
      gameStore,
      game,
      users,
      creatures,
      actors,
      tableConfig,
      account,
      messages,
      isConnected,
      players,
      playerBP,
      textHistory,
      loreMsgData,
      images,
      devHeight,
      devWidth,
      imgConfig,
      serverURL,
      myUser,
      appSocket
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



  /*   const reducer = async (type: string, payload: any) => {
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
  } */

/*   const gblMsgHandler = React.useCallback(
    (message: types.messageType) => {
      switch (message.type) {
        case 'private':
          setMessages([...messages, message])
          break
        default:
          break
      }
    },
    [messages]
  ) */
