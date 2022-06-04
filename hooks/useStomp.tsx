import { useState, useEffect } from 'react'
import SockJS from 'sockjs-client'
import webStompClient from 'webstomp-client'
import * as types from '../types/rpg-types'
import { useAppContext } from '../context/AppProvider'

const useStomp = (url = 'http://localhost:8080/game-app') => {
  const [message, setMessage] = useState<types.messageType>()

  const {account, gblMsgHandler,setWSSocket, stompClient, setStompClient, messages, setMessages, isConnected, setIsConnected} = useAppContext()

  const connectionSuccess = (frame: any, client: any) => {
    console.log('connection was successful')
    setIsConnected(true)
    // register ''default' message channel listeners
    client.subscribe('/topic/chat', (message: types.messageType) => messageHandler(message))
    client.subscribe('/user/queue/message', (message: types.messageType) => messageHandler(message))
  }

  const connectionError = (error: any) => {
    console.log(error)
    setIsConnected(false)
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
    //The body of the returned Stomp message is what we want, a JSON string representation of 'GameMessage' Java class
    const serverMessage = JSON.parse(message.body)
    console.log(serverMessage)
    gblMsgHandler(serverMessage)
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