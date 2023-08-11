import { setObjValue, deepCopy } from '@utils/utils'
import * as rpgTypes from '../types/rpg-types'

export const UPDATE_LISTS = 'UPDATE_LISTS'


export const gmReducer = (state: rpgTypes.GMState, action: rpgTypes.Action) => {
  let absPath: string
  let newState: rpgTypes.GMState // New state object
  switch (action.type) {
    case UPDATE_LISTS:
      const {collection,list} = action.payload
      newState = deepCopy(state) // Create a new copy of the state
      console.log(`Adding GM State value ${action.payload.collection}`)
      newState[collection] = list // Modify the new state
      return newState // Return the new state

    default:
      return state
  }
}