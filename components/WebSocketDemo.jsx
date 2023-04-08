import React, { useState, useCallback, useEffect, useRef } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'

export const WebSocketDemo = () => {
  //Public API that will echo messages sent to it back to the client
  const msgRef = useRef()
  const [socketUrl, setSocketUrl] = useState('ws://localhost:8000')
  const [isConnected,setIsConnected] = useState(false)
  const [messageHistory, setMessageHistory] = useState([])

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl)

  useEffect(() => {
  }, [])


  const handleClickSendMessage = useCallback(() => {
    let msgData = JSON.stringify({ name: 'bob', password: 'pa55w0rd' })
    let stockMsg = JSON.stringify({
      id: 1,
      sender: 'bob',
      timeStamp: '',
      type: 'login',
      data: msgData,
      dest: ['server'],
    })
    const msg2Send = msgRef?.current?.value
    msg2Send = msg2Send !='' ? msg2Send : stockMsg
    console.log(`sending msg ${msg2Send}`)
    sendMessage(msg2Send)
  }, [])

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState]

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <button onClick={handleClickChangeSocketUrl}>Click Me to change Socket Url</button>
      <span>Message</span>
      <input type="text" ref={msgRef}></input>
      <button onClick={handleClickSendMessage} disabled={readyState !== ReadyState.OPEN}>
        Click Me to send Msg
      </button>
      <span>The WebSocket is currently {connectionStatus}</span>
      {lastMessage ? <span>Last message: {lastMessage.data}</span> : null}
      <ul>
        {messageHistory.map((message, idx) => (
          <span key={idx}>{message ? message.data : null}</span>
        ))}
      </ul>
    </div>
  )
}
