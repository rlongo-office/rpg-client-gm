import { useState, useEffect } from 'react'
import * as types from '../types/rpg-types'
import { useAppContext } from '../context/app-provider'

const useWSHandlers = () => {
  const [message, setMessage] = useState<types.messageType>()

  const { game, setGame, images, setImages } = useAppContext()

  let MessageEventHandlers: Function[] = []

  enum handlerKey {
    privateText = 0,
    groupText,
    gameText,
    imageExchange,
    statUpdate,
    gameUpdate,
    loreText,
  }

  /* Jason has recommended we move this into 'Service' for better efficiency and use */
  MessageEventHandlers[handlerKey.privateText] = function (msg: any) {
    //inbound process of text message sent to multiple party members and GM
  }
  MessageEventHandlers[handlerKey.groupText] = function (msg: any) {
    //inbound process of text message sent to multiple party members and GM
  }
  MessageEventHandlers[handlerKey.gameText] = function (msg: any) {
    //inbound process of text message from 'game' entity for all to see
  }
  MessageEventHandlers[handlerKey.imageExchange] = function (msg: any) {}

    /*Any changes related to player stats*/
  MessageEventHandlers[handlerKey.statUpdate] = function (msg: any) {}

  /*Any changes related to game object, which could include but not limited to
  environment changes, player locations, conditions in the environment, campaign
  updates, etc*/
  MessageEventHandlers[handlerKey.gameUpdate] = function (msg: any) {
    //update game object in App Provider
    //we just want to update the game object for those values that changed, however
    //for simplicity, we will simply replace the full game object whenever there is a change
    setGame(msg.data)
  }

  return { handlerKey, MessageEventHandlers }
}

export default useWSHandlers
