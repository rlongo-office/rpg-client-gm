import { useAppContext } from '@context/app-provider'
import {useEffect, useState,useCallback} from 'react'
import useWSHandlers from './useWSHandlers'




const useWSManager = () => {
  const {serverURL,setAppSocket,appSocket,setIsConnected,isConnected} = useAppContext()
  const {processInboundMessage} = useWSHandlers()
  //const [socketUrl, setSocketUrl] = React.useState(url)

  useEffect(() => {
    if (!isConnected){
      const socket = new WebSocket(serverURL);
      socket.onopen = () => setIsConnected(true);
      socket.onclose = () => setIsConnected(false);
      socket.onmessage = (event) => {
        processInboundMessage(event.data)
      }
      setAppSocket(socket)
    }
  }, []);

  const sendOutboundMessage = useCallback((msg: string) => {
    //In case I need to do things before I use the use react websocket main send function
    if (appSocket){
      appSocket.send(msg)
    }

  }, [appSocket])

  return {sendOutboundMessage }
}

export default useWSManager

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
