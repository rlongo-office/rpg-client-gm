import { useState, useEffect } from "react";
import SockJS from 'sockjs-client'
import webStompClient, { Client } from 'webstomp-client'
import * as types from '../types/rpg-types'

// Globally shared variable (singleton):
let ws = null

const useStomp = (url:string,user:types.user,channels:string[],msgHandler:Function) => {
  const [client, setClient] = useState<any>(null);
  const [msgCount,setMsgCount] = useState(0)
  const [inMsg,setInMsg] = useState<object>({})
  const [isConnected,setIsConnected] = useState<boolean>(false)

  useEffect(() => {
    connect()
  }, [url]);

  useEffect(() => {
    msgHandler(inMsg)  
  }, [inMsg]);

  const connect = async () => {
    let name = user.name
    let password = user.password
    let newSocket = new SockJS(url)
    ws = newSocket
    let newStompClient = webStompClient.over(newSocket)
    setClient(newStompClient)
    await newStompClient.connect(
      { name,password },
      (frame: any) => connectionSuccess(frame, newStompClient),
      connectionError
    )
  }

  const connectionSuccess = (frame: any, client: any) => {
    console.log(frame)
    setIsConnected(true)
    // register ''default' message channel listeners
    client.subscribe('/topic/chat', (message: types.messageType) => hookMessageHandler(message))
    client.subscribe('/user/queue/message', (message: types.messageType) => hookMessageHandler(message))
  }

  const connectionError = (error: any) => {
    console.log(error)
    setIsConnected(false)
  }

  //This function only sets the useState for inbound message.  The UseEffect hook ensures that we
  //call the passed function with the new message so the external component is responsible for
  //processing it's own message.  The useStomp hook remains agnostic to how any message is processed
  const hookMessageHandler = (message: any) => {
    setInMsg(message)
  }

  const sendMessage = (msg: types.messageType) => {
    let msgString = JSON.stringify(msg)
    console.log('sendMessage called')
    console.log('isConnected is ' + isConnected)
    const { type, body, dest } = msg
    if (Client && isConnected) {
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
  //Return a sendMessage function that components can use to send message
  return sendMessage

};

export default useStomp;
