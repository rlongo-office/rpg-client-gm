import { useAppContext } from '@context/app-provider'
import * as React from 'react'
import SockJS from 'sockjs-client'
import webStompClient from 'webstomp-client'
import * as types from '../types/rpg-types'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import useWSHandlers from './useWSHandlers'

const useWSManager = (url: string) => {
  const { processInboundMessage } = useWSHandlers()
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
  const [socketUrl, setSocketUrl] = React.useState(url)
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
    onMessage: event => {
      processInboundMessage(event.data)
      console.log(`Received message: ${event.data}`)
    },
  })

  const sendOutboundMessage = React.useCallback(() => {
    let msgData = JSON.stringify({ name: 'bob', password: 'pa55w0rd' })
    let stockMsg = JSON.stringify({
      id: 1,
      sender: 'bob',
      timeStamp: '',
      type: 'login',
      data: msgData,
      dest: ['server'],
    })
    let outbound = stockMsg
    sendMessage(outbound)
  }, [])

  return {sendOutboundMessage}
}

export default useWSManager
