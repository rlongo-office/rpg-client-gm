import { useAppContext } from '@context/app-provider'
import * as React from 'react'
import * as types from '../types/rpg-types'
import { useRouter } from 'next/router'
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
  const {setMyUser,setGame,myUser} = useAppContext()
  const MessageEventHandlers: Function[] = []
  const router = useRouter()

  const processInboundMessage = (inbound: string) => {
    const inMsg:types.messageType = JSON.parse(inbound)
    const inType: string = inMsg.type
    return MessageEventHandlers[handlerKey[inType as keyof typeof handlerKey]](inbound)
  }

  MessageEventHandlers[handlerKey.loginAck] = function (msg: string) {
    //acknowledgement from server after login
    //A log ack will have the game object as it's data, we could call other handlers from here if needed
    const inMsg:types.messageType = JSON.parse(msg)
    setMyUser(inMsg.dest[0])    //on a loginAck the only recipient is the login use, so save it
    console.log(`Successfully logged into to the server as ${myUser}`)
    router.push("/chat-page")
  }
  /* Jason has recommended we move this into 'Service' for better efficiency and use */
  MessageEventHandlers[handlerKey.privateText] = function (msg: string) {
    //inbound process of text message sent to multiple party members and GM
  }
  MessageEventHandlers[handlerKey.groupText] = function (msg: string) {
    //inbound process of text message sent to multiple party members and GM
  }
  MessageEventHandlers[handlerKey.gameText] = function (msg: string) {
    //inbound process of text message from 'game' entity for all to see
  }
  MessageEventHandlers[handlerKey.imageExchange] = function (msg: string) {}

  MessageEventHandlers[handlerKey.statUpdate] = function (msg: string) {}

  /*Any changes related to game object, which could include but not limited to
  environment changes, player locations, conditions in the environment, campaign
  updates, etc*/
  MessageEventHandlers[handlerKey.gameUpdate] = function (msg: string) {
    console.log("Received GameUpdate message")
    console.log(msg)
    //Unwrap (parse) the entire message first, then unwrap the data that is our game object
    setGame(JSON.parse(JSON.parse(msg).data))
  }
  return { processInboundMessage }
}

export default useWSHandlers
