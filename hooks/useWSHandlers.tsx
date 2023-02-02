import { useAppContext } from '@context/app-provider'
import * as React from 'react'
import * as types from '../types/rpg-types'
//TYPES
type MessageHandlerTypes = {
  [key: string]: (msg: any) => void
}

const useWSHandlers = () => {
  const { setGame } = useAppContext()



  const MessageEventHandlerService: MessageHandlerTypes = {
    privateText: function (msg: any) {},
    groupText: function (msg: any) {},
    gameText: function (msg: any) {},
    imageExchange: function (msg: any) {},
    statUpdate: function (msg: any) {},
    gameUpdate: function (msg: any) {},
  }

  return { MessageEventHandlerService }
}

export default useWSHandlers
