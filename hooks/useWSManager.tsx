import { useAppContext } from '@context/app-provider'
import {useEffect, useState,useCallback} from 'react'
import useWSHandlers from './useWSHandlers'

const useWSManager = () => {
  const {serverURL,setAppSocket,appSocket,setIsConnected,isConnected,users} = useAppContext()
  const {processInboundMessage} = useWSHandlers()
  //const [socketUrl, setSocketUrl] = React.useState(url)

  useEffect(() => {
    const handleMessage = async (event) => {
      console.log(`Here are the users right now: ${users}`);
      await processInboundMessage(event.data);
    };

    if (!appSocket){
      const socket = new WebSocket(serverURL);
      socket.onopen = () => setIsConnected(true);
      socket.onclose = () => setIsConnected(false);
      socket.onmessage = handleMessage
/*       socket.onmessage = async (event) => {
        console.log(`Here are the users right now: ${users}`)
        await processInboundMessage(event.data) */
        setAppSocket(socket)  // this will rerender hook
      } else {
        if (appSocket) {
          /*REMOVE THE EXISTING ONMESSAGE HANDLER, BUT TEST IF IT EXISTS */
          if (appSocket.onmessage) {
            appSocket.onmessage = null; // Remove the existing onmessage handler
          }
          appSocket.onmessage = handleMessage;
        }
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
