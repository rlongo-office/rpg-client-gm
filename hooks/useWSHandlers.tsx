import { useAppContext } from '@context/app-provider'
import * as React from 'react'
import * as types from '../types/rpg-types'
//TYPES

enum handlerKey {
  loginAck = 0,
  privateText,
  groupText,
  gameText,
  imageExchange,
  statUpdate,
  gameUpdate,
  loreText,
}

const useWSHandlers = () => {
  const { setGame } = useAppContext()
  const MessageEventHandlers: Function[] = []

  const processInboundMessage = (inbound: string) => {
    const inMsg:types.messageType = JSON.parse(inbound)
    const inType: string = inMsg.type
    return MessageEventHandlers[handlerKey[inType as keyof typeof handlerKey]](inbound)
  }

  MessageEventHandlers[handlerKey.loginAck] = function (msg: types.messageType) {
    //acknowledgement from server after login
    console.log('Successfully logged into to the server')
  }
  /* Jason has recommended we move this into 'Service' for better efficiency and use */
  MessageEventHandlers[handlerKey.privateText] = function (msg: types.messageType) {
    //inbound process of text message sent to multiple party members and GM
  }
  MessageEventHandlers[handlerKey.groupText] = function (msg: types.messageType) {
    //inbound process of text message sent to multiple party members and GM
  }
  MessageEventHandlers[handlerKey.gameText] = function (msg: types.messageType) {
    //inbound process of text message from 'game' entity for all to see
  }
  MessageEventHandlers[handlerKey.imageExchange] = function (msg: types.messageType) {}

  MessageEventHandlers[handlerKey.statUpdate] = function (msg: types.messageType) {}

  /*Any changes related to game object, which could include but not limited to
  environment changes, player locations, conditions in the environment, campaign
  updates, etc*/
  MessageEventHandlers[handlerKey.gameUpdate] = function (msg: types.messageType) {
    //update game object in App Provider
  }

  return { processInboundMessage }
}

export default useWSHandlers
