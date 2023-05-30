import { useAppContext } from '@context/app-provider'
import * as React from 'react'
import {useEffect} from 'react'
import * as rpgTypes from '../types/rpg-types'
import * as types from '../types/rpg-types'
import { useRouter } from 'next/router'
import {sender2TextType} from '../utils/utils'
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
  textUpdate
}

const useWSHandlers = () => {
  const {game,setMyUser,setGame,myUser,users,setTextHistory,textHistory} = useAppContext()

  useEffect(() => {
    // context values weren't updating on change, needed a useEffect hook
  }, [myUser, users, setMyUser, setGame, setTextHistory, textHistory]);



  const MessageEventHandlers: Function[] = []
  const router = useRouter()

  const processInboundMessage = (inbound: string):string | number => {
    const inMsg:types.messageType = JSON.parse(inbound)
    const inType: string = inMsg.type
    return MessageEventHandlers[handlerKey[inType as keyof typeof handlerKey]](inbound)
  }

  MessageEventHandlers[handlerKey.loginAck] = function (msg: string) {
    //acknowledgement from server after login
    //A log ack will have the game object as it's data, we could call other handlers from here if needed
    debugger
    const inMsg:types.messageType = JSON.parse(msg)
    const loginData: {user: string, password: string} = JSON.parse(inMsg.data)
    setMyUser(loginData.user)    //on a loginAck the only recipient is the login use, so save it
    console.log(`Successfully logged into to the server as ${loginData.user}`)
    if (loginData.user != 'gm') {
      router.push(`/player-sheet`)
    } else {
      router.push(`/player-sheet`)
    }
    return "logged in"
  }
  /* Jason has recommended we move this into 'Service' for better efficiency and use */
  MessageEventHandlers[handlerKey.privateText] = function (msg: string) {
    //inbound process of text message sent to multiple party members and GM
    return 1
  }
  MessageEventHandlers[handlerKey.groupText] = function (msg: string) {
    //inbound process of text message sent to multiple party members and GM
    const msgObj = JSON.parse(msg)
    console.log(`From Handler: sender: ${msgObj.sender}  users: ${users}`)
    const textType = sender2TextType(msgObj.sender,users)
    const textMsg:rpgTypes.TextMessage = {
      id: msgObj.id,
      type: textType,
      timeStamp: msgObj.timeStamp,
      sender: msgObj.sender,
      text: msgObj.data,
      dest: msgObj.dest
    }
    console.log(textMsg)
    setTextHistory([...textHistory, textMsg])
    console.log(`Received msg: ${textMsg.text} from ${textMsg.sender}`)
    return 1
  }
  MessageEventHandlers[handlerKey.gameText] = function (msg: string) {
    //inbound process of text message from 'game' entity for all to see
    return 1
  }
  MessageEventHandlers[handlerKey.imageExchange] = function (msg: string) {
    return 1
  }

  MessageEventHandlers[handlerKey.statUpdate] = function (msg: string) {
    return 1
  }

  /*Any changes related to game object, which could include but not limited to
  environment changes, player locations, conditions in the environment, campaign
  updates, etc*/
  MessageEventHandlers[handlerKey.gameUpdate] = function (msg: string) {
    console.log("Received GameUpdate message")
    //Unwrap (parse) the entire message first, then unwrap the data that is our game object
    setGame(JSON.parse(JSON.parse(msg).data))
    return 1
  }

  //Periodic changes to text history, after archiving older text message on the server
  MessageEventHandlers[handlerKey.textUpdate] = function (msg: string) {
    console.log("Received text History message")
    //Unwrap (parse) the entire message first, then unwrap the data that is our game object
    setTextHistory(JSON.parse(JSON.parse(msg).data))
    return 1
  }



  return { processInboundMessage }
}

export default useWSHandlers

