import { setObjValue, deepCopy } from '@utils/utils'
import * as rpgTypes from '../types/rpg-types'

export const UPDATE_VALUE = 'UPDATE_VALUE'
export const UPDATE_CLIMATE = 'UPDATE_CLIMATE'
export const UPDATE_CHARACTER = 'UPDATE_CHARACTER'
export const UPDATE_TEXTS = 'UPDATE_TEXTS'
export const UPDATE_GAME = 'UPDATE_GAME'

export const gameReducer = (state: rpgTypes.GameState, action: rpgTypes.Action) => {
  let absPath: string
  let newState: rpgTypes.GameState // New state object
  switch (action.type) {
    case UPDATE_VALUE:
      newState = deepCopy(state) // Create a new copy of the state
      setObjValue(newState, action.path, action.payload) // Modify the new state
      return newState // Return the new state

    case UPDATE_CLIMATE:
      absPath = `game.climate[0].${action.path}`
      newState = deepCopy(state) // Create a new copy of the state
      setObjValue(newState, absPath, action.payload) // Modify the new state
      return newState // Return the new state

    case UPDATE_TEXTS:
      absPath = `textHistory`
      console.log(`Reducer:updating text history`)
      newState = deepCopy(state) // Create a new copy of the state
      setObjValue(newState, absPath, action.payload) // Modify the new state
      console.log(`New state from reducer gameState:textHistory is ${newState} `)
      return newState // Return the new state

    case UPDATE_CHARACTER:
      // Perform the necessary logic to set the creature ID in the state
      // You can directly modify the state object or create a new state object if needed
      return { ...state, creatureId: action.payload }

    case UPDATE_GAME:
      absPath = ``
      newState = deepCopy(state) // Create a new copy of the state
      setObjValue(newState, absPath, action.payload) // Modify the new state
      return action.payload // Return the new state

    default:
      return state
  }
}
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
