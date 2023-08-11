import { useState, useEffect } from 'react'
import * as types from '../types/rpg-types'
import { useAppContext } from '../context/app-provider'
import { iterateObjEntries, getObjValue, setObjValue, deepCopy, getNodeType } from '../utils/utils'
import { waitForDebugger } from 'inspector'

//with so many possibilities for changes of state in the application being called/required by different
//components, felt that creating a reducer hook could keep the mess neatly contained.  The objReducer
//would also make any call outs to validation functions or hooks, also keeping the components cleaner and
//easier to read
const useObjReducerAlternate = () => {
  const stateObj = 0
  const stateFunc = 1
  const { gameStates } = useAppContext()

  useEffect(() => {}, [])

  const objReducer = (obj: string, data: object, action: string, path: string) => {
    switch (action) {
      //Adding the value (which could a primative or a complext object) at the path point
      //We should be adding validation code to check types for the objects
      case 'add-object':
        //I want to manipulate an unconnected copy, not a reference
        let tempInObj = deepCopy(gameStates[obj][stateObj])
        //object insert point - first get the object we are adding onto or in at the point of of the path.
        let objInPoint = getObjValue(tempInObj, path, 0)
        //Test if this is an array, object, or value change
        switch (getNodeType(objInPoint)) {
          case 'array':
            objInPoint = [...objInPoint, data]
            break
          case 'object':
            objInPoint = { ...objInPoint, data }
            break
          case 'value':
            break //by 'value' we mean terminating 'leaves' in the object so nothing to 'add' too
        }
        //now set the subObject with the inserted data back in the original parent object
        setObjValue(tempInObj, path, objInPoint)
        //and call that object's app context set function to change at the app level
        gameStates[obj][stateFunc](tempInObj)
        //setGame(tempInObj)
        console.log(tempInObj)
        break
      //Updating the value (which could a primative or a complext object) at the path point. Same validation
      //requirements as for add
      case 'update-object':
        //I want to manipulate an unconnected copy, not a reference
        let tempUpObj = deepCopy(gameStates[obj][stateObj])
        //object update point - first get the object we are adding onto or in at the point of of the path.
        //now set the subObject with the inserted data back in the original parent object
        setObjValue(tempUpObj, path, data)
        //and call that object's app context set function to change at the app level
        gameStates[obj][stateFunc](tempUpObj)
        break
      //Delete the value (either a key value pair or an element in an array) at the path point. Same validation
      //requirements as for add and update needed here

      case 'delete-object':
        //I want to manipulate an unconnected copy, not a reference
        let tempDelObj = deepCopy(gameStates[obj][stateObj])
        //object insert point - first get the object we are adding onto or in at the point of of the path.
        let objDelPoint = getObjValue(tempDelObj, path, 0)
        //Test if this is an array, object, or value change
        switch (getNodeType(objDelPoint)) {
          case 'array':
            let index = objDelPoint.indexOf(data)
            objDelPoint = objDelPoint.slice(index, 1)
            break
          case 'object':
            let objKey: any = Object.keys(tempDelObj).find((key: any) => tempDelObj[key] === data)
            delete objDelPoint[objKey]
            break
          case 'value': //by 'value' we mean terminating 'leaves', and we don't 'delete' leaves, only 'nodes'
            break
        }
        //now set the subObject with the inserted data back in the original parent object
        setObjValue(tempDelObj, path, objDelPoint)
        //and call that object's app context set function to change at the app level
        gameStates[obj][stateFunc].call(tempDelObj)
        break
      case 'return-object':
        return gameStates[obj][stateObj]
        break
    }
  }

  return { objReducer }
}

export default useObjReducerAlternate
