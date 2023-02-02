import { useAppContext } from '@context/app-provider'
import * as React from 'react'
import SockJS from 'sockjs-client'
import webStompClient from 'webstomp-client'
import * as types from '../types/rpg-types'
import useWSHandler from './useWSHandlers'

const useStomp = (url = 'http://localhost:8080/game-app') => {
  const { MessageEventHandlerService } = useWSHandler()

  const {
    account,
    gblMsgHandler,
    setWSSocket,
    stompClient,
    setStompClient,
    messages,
    setMessages,
    isConnected,
    setIsConnected,
  } = useAppContext()

  const connectionSuccess = (frame: any, client: any) => {
    console.log('connection was successful')
    setIsConnected(true)
    // register ''default' message channel listeners
    client.subscribe('/topic/chat', (message: types.messageType) => messageHandler(message))
    client.subscribe('/user/queue/message', (message: types.messageType) => messageHandler(message))
    return true
  }

  const connectionError = (error: any) => {
    console.log(error)
    setIsConnected(false)
    return false
  }

  const connect = async (username: string, password: string) => {
    if (!stompClient) {
      let newSocket = new SockJS(url)
      setWSSocket(newSocket)
      let newStompClient = webStompClient.over(newSocket)
      setStompClient(newStompClient)
      await newStompClient.connect(
        { username, password },
        (frame: any) => connectionSuccess(frame, newStompClient),
        connectionError
      )
    }
  }

  const messageHandler = (message: any) => {
    // fire the 'connect' callbacks
    //The STOMP "body" is a stringified object that comprises the game message, so we only
    //so we parse this for game use
    let gameMsg: types.messageType = JSON.parse(message.body)
    const { type: key } = gameMsg
    MessageEventHandlerService[key].call
  }

  const sendMessage = (message: types.messageType) => {
    let msgString = JSON.stringify(message)
    console.log('sendMessage => ', msgString)
    console.log('isConnected is ' + isConnected)
    const { type } = message
    if (stompClient && isConnected) {
      switch (type) {
        case 'party':
          stompClient.send('/app/chat', msgString, {})
          break
        case 'private':
          stompClient.send('/app/messages', msgString, {})
          break
      }
    }
  }

  return { connect, sendMessage }
}

export default useStomp
