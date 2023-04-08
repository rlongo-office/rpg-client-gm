import { useAppContext } from '@context/app-provider'
import * as React from 'react'
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
      console.log(`Received message: ${event.data}`)
      processInboundMessage(event.data)
    },
  })

  const sendOutboundMessage = React.useCallback((msg:string) => {
    sendMessage(msg)
  }, [])

  return {sendOutboundMessage}
}

export default useWSManager
