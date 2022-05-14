import { useState, useEffect } from 'react'
import SockJS from 'sockjs-client'
import webStompClient, { Client } from 'webstomp-client'
import { useAppContext } from '../context/AppProvider'

// Globally shared variable (singleton):
let _ws = null
let _isConnected = false
let _client = null
let name = 'bob'
let password = ''

const useRLStomp = () => {

  async function connect() {
    //Test if we have a client object; we don't want repeated connection attempts if there is an existing stomp client
    if (!_isConnected) {
      _ws = new SockJS('http://localhost:8080/game-app')
      _client = webStompClient.over(_ws)
      _client.connect(
            { name, password },
            frame => connectionSuccess(frame, _client),
            connectionError
        )
    }
  }

  const connectionSuccess = (frame, _client) => {
    _isConnected = true
    console.log("Successful connection")
    // register ''default' message channel listeners
    _client.subscribe('/topic/chat', message => inboundMsgHandler(message))
    _client.subscribe('/user/queue/message', message => inboundMsgHandler(message))
  }

  const connectionError = error => {
    console.log(error)
    _isConnected = false
  }

  const inboundMsgHandler = message => {
    //use the dispatch we got
    //dispatch(message)
    console.log(`got an inbound message of ${message}`)
  }

  const sendMessage = message => {
    let msgString = JSON.stringify(message)
    console.log('sendMessage called')
    console.log('isConnected is ' + _isConnected)
    const { type, body, dest } = message
    if (_client && _isConnected) {
      switch (type) {
        case 'party':
          _client.send('/app/chat', msgString, {})
          break
        case 'private':
          _client.send('/app/messages', msgString, {})
          break
      }
    }
  }

  useEffect(() => {
    connect()
    console.log('Hook Loaded')
  }, [])

/*   useEffect(() => {
    const connectToClient = async () => {
      await client?.connect(
        { name, password },
        frame => connectionSuccess(frame, client),
        connectionError
      )
    }
    connectToClient()
  }, [client]) */

  return sendMessage
}

export default useRLStomp
