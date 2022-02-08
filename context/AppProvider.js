import * as Types from '../types/rpg-types'
import { createContext, useContext, useState,useReducer } from 'react';
import creatures from '../data/collections/creatures.json'

export const initialState ={
    creatures:creatures,
    actors:[],
    testMessage:[],
    creatureID:0
}
export const AppContext = createContext()

export const appReducer = (state=initialState, action) => {
    const {type, payload} = action
    const {creatures,actors,testMessage} = state
     switch(type){
         case Types.ADD_ACTOR:
             //let newArray = actors.length<1 ? [payload] : [...actors,payload]
             return {...state,
                actors:[...actors,payload]
            }
         case Types.ADD_CREATURE:
            console.log("Add creature action type called in Reducer")
             return {
                ...state,
                testMessage:[...state?.testMessage,"ADD_CREATURE"]
            }
        case Types.SET_CREATURE_ID:
            return{
                ...state,
                creatureID:payload
            }
     }
     console.log(state.actors)
 };

 export const AppProvider = ({children})=>{
    const [state, dispatch] = useReducer(appReducer,initialState)
    const value = {state,dispatch}
    return (
      <AppContext.Provider value={value}>
        {children}
      </AppContext.Provider>
    )
  
  }

export function useAppContext() {
    const store = useContext(AppContext)
    if (!store) {
      throw ('Store is not defined')
    }
    return store;
  }

  
  export default {initialState,appReducer,AppContext,useAppContext,AppProvider};