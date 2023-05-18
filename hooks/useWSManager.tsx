import { useAppContext } from '@context/app-provider'
import {useEffect, useState,useCallback} from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import useWSHandlers from './useWSHandlers'
import * as rpgTypes from '../types/rpg-types'
import { getCurrentTimeString } from '@utils/utils'

const useWSManager = () => {
  const { processInboundMessage } = useWSHandlers()
  const {serverURL,myUser } = useAppContext()
  //const [socketUrl, setSocketUrl] = React.useState(url)
  const { sendMessage, readyState, sendJsonMessage } = useWebSocket(serverURL, {
    onMessage: event => {
      console.log(`Received message: ${event.data}`)
      processInboundMessage(event.data)
    },
  })

/*   useEffect(() => {
    //define the behavior we want upon window close
    const closeWebSocket = () => {
      if (readyState === ReadyState.OPEN) {
        // Close the WebSocket connection      
        const msgClose:rpgTypes.messageType = {
        id: 0.1,
        sender: myUser,
        timeStamp: getCurrentTimeString(),
        type: 'close',
        data: '',
        dest: ["server"]
      }
      sendMessage(JSON.stringify(msgClose));
        // Additional cleanup or state updates if necessary
      }
    };
    // Add window listener for beforeunload event
    window.addEventListener('beforeunload', closeWebSocket);
    // Clean up the window listener when the component unmounts
    return () => {
      window.removeEventListener('beforeunload', closeWebSocket);
    };
  }, [readyState]); */



  const sendOutboundMessage = useCallback((msg: string) => {
    sendMessage(msg)
  }, [])

  return {sendOutboundMessage }
}

export default useWSManager
