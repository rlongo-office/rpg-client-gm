import { useState, useEffect } from 'react'
import SockJS from 'sockjs-client'
import webStompClient, { Client } from 'webstomp-client'
import * as types from '../types/rpg-types'
import { useAppContext } from '../context/AppProvider'

/**
 * Think ONLY Chat component for now. :-)
 * @param url
 * @param user
 * @param channels
 * @param msgHandler
 */
const useStomp = () => {
  const [ws, setWs] = useState<any>(null)
  const [msg, setMsg] = useState<types.messageType>()
  const [isConnected, setIsConnected] = useState<boolean>(false)
  // TODO: use the process_env and set the url in context
  const {user, dispatch, client, setClient} = useAppContext()
  const { name, password } = user

  const connectionSuccess = (frame: any, client: any) => {
    setIsConnected(true)
    // register ''default' message channel listeners
    client.subscribe('/topic/chat', (message: types.messageType) => inboundMsgHandler(message))
    client.subscribe('/user/queue/message', (message: types.messageType) =>
      inboundMsgHandler(message)
    )
  }

  const connectionError = (error: any) => {
    console.log(error)
    setIsConnected(false)
  }

  const inboundMsgHandler = (message: types.messageType) => {
    //use the dispatch we got
    dispatch(message)
  }

  const sendMessage = (message: types.messageType) => {
    let msgString = JSON.stringify(message)
    console.log('sendMessage called')
    console.log('isConnected is ' + isConnected)
    const { type, body, dest } = message
    if (client && isConnected) {
      switch (type) {
        case 'party':
          client.send('/app/chat', msgString, {})
          break
        case 'private':
          client.send('/app/messages', msgString, {})
          break
      }
    }
  }

  useEffect(() => {
    const connectToClient = async () => {
      //Test if we have a client object; we don't want repeated connection attempts if there is an existing stomp client
      if (!client) {
        const newSocket = new SockJS('http://localhost:8080/game-app')
        const newClient = webStompClient.over(newSocket)
        await newClient?.connect(
          { name, password },
          (frame: any) => connectionSuccess(frame, newClient),
          connectionError
        )
        setClient(newClient)
        setWs(newSocket)
      }
    }
    connectToClient()
  }, [user, client])

  return { sendMessage }
}

export default useStomp
