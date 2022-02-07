import * as Types from '../types/rpg-types'
import { createContext, useContext, useState,useReducer } from 'react';
import creatures from '../data/collections/creatures.json'

export const initialState ={
    creatures:creatures,
    actors:[],
    testMessage:[]
}
export const AppContext = createContext()

export const appReducer = (state=initialState, action) => {
     switch(action.type){
         case Types.ADD_ACTOR:
            console.log("Add Actor action type called in Reducer")
            console.log(state.testMessage)
            return {
                state,
                testMessage:[...state?.testMessage,"ADD_ACTOR"]
            }
         case Types.ADD_CREATURE:
            console.log("Add creature action type called in Reducer")
             return {
                ...state,
                testMessage:[...state?.testMessage,"ADD_CREATURE"]
            }
     }
     console.log(state.creatures)
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