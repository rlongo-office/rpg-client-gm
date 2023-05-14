import { useAppContext } from '@context/app-provider'
import * as React from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import useWSHandlers from './useWSHandlers'

const useWSManager = (url: string) => {
  const { processInboundMessage } = useWSHandlers()
  const {serverURL } = useAppContext()
  //const [socketUrl, setSocketUrl] = React.useState(url)
  const { sendMessage, lastMessage, readyState } = useWebSocket(serverURL, {
    onMessage: event => {
      console.log(`Received message: ${event.data}`)
      processInboundMessage(event.data)
    },
  })

  const sendOutboundMessage = React.useCallback((msg: string) => {
    sendMessage(msg)
  }, [])

  return { sendOutboundMessage }
}

export default useWSManager
