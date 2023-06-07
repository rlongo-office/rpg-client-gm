import { setObjValue } from '@utils/utils';
import * as rpgTypes from '../types/rpg-types'

export const UPDATE_VALUE = 'UPDATE_VALUE';
export const UPDATE_CLIMATE = 'ADD_CREATURE';
export const UPDATE_CHARACTER = 'SET_CREATURE_ID';

/* This state map object is an attempt to remove the responsibility of knowing the location of keys inside the state that
context or components are requesting for update. So, for example, if we build a client component that changes the weather (most 
likey by the GM of course) the dispatch would be for weather.highTemp but the state map know the absolute path to the value.
This eliminates the need to recode paths inside lots of children, and keeps the absolute paths defined in one place in case
changes are made to the state object structure */
const StateMap = {

}




export const gameReducer = (state: rpgTypes.GameState, action: rpgTypes.Action) => {
    switch (action.type) {
      //This is a special action, where the reducer IS being passed the absolute path to the key/value to change
      //It will be used for some generic, quick and dirty editing components, not for targeted functionality
      case UPDATE_VALUE:
        setObjValue(state,action.path,action.payload)
        return state
      case UPDATE_CLIMATE:
        const absPath = `weather.${action.path}`
        return state
      case UPDATE_CHARACTER:
        // Perform the necessary logic to set the creature ID in the state
        // You can directly modify the state object or create a new state object if needed
        return { ...state, creatureId: action.payload };
      default:
        return state
    }
  };

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