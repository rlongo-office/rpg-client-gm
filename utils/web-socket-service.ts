import SockJS from 'sockjs-client'
import WebStompClient from 'webstomp-client'

// define the game service resources here
let _isConnected = false
let _socket = null
let _stompClient: any = null

interface messageType {
  id: string
  type: string
  body: string
  dest: string
}

// eslint-disable-next-line no-unused-vars
const _eventHandlers = {
  connect: [], // functions to call when a connect event occurs
  disconnect: [],
  'receive-message': [],
  load: [],
}

// eslint-disable-next-line no-unused-vars

const messageHandler = (message: messageType) => {
  // fire the 'connect' callbacks
  let msg = JSON.parse(message.body)
  console.log('web-socket-service:message callback for received message')
  const event = msg
  return msg
}

const connectionSuccess = (frame: any) => {
  console.log(frame)
  _isConnected = true
  // register ''default' message channel listeners
  _stompClient.subscribe('/topic/chat', (message:messageType) => messageHandler(message))
  _stompClient.subscribe('/user/queue/message', (message:messageType) => messageHandler(message))
}

const connectionError = (error: any) => {
  console.log(error)
  _isConnected = false
}

export const wstools =  {

  connect: async (username:string, password:string)=> {
    _isConnected = false
    _socket = new SockJS('http://localhost:8080/game-app')
    _stompClient = WebStompClient.over(_socket)
    await _stompClient.connect({ username, password }, (frame: any) => connectionSuccess(frame), connectionError)
  },

  disconnect() {
    _isConnected = false
  },

  sendMessage: (msg:messageType)=> {
    let type = msg.type
    let msgString = JSON.stringify(msg)
    console.log('message-service sendMessage ' + msgString)
    //const { user, channel, body} = message;
    if (_stompClient && _isConnected) {
      switch (type) {
        case 'party':
          _stompClient.send('/app/chat', msgString, {})
          break
        case 'private':
          _stompClient.send('/app/messages', msgString, {})
          break
      }
    }
  },

  get isConnected() {
    return _isConnected
  },
}

export default { wstools }