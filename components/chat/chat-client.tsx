import { useRef, useEffect, useState } from 'react'
import ChatRecipients from './chat-recipients'
import ChatHistory from './chat-history'
import ChatEntry from './chat-entry'
import { useAppContext } from '@context/app-provider'
import useWSManager from '@hooks/useWSManager'
import * as types from '../../types/rpg-types'

function ChatClient() {
  const { gameObject } = useAppContext()
  const msgRef = useRef<HTMLInputElement>(null)
  const [recipient, setRecipient] = useState('')

  useEffect(() => {}, [])

  const sendChatMessage = () => {
    let msg: types.messageType = {
      id: 0,
      sender: '',
      timeStamp: '',
      type: '',
      data: '',
      dest: []
    }
  }

  return (
    <div id="chat-client">
      <ChatRecipients />
      <input type="text" ref={msgRef}></input>
      <button onClick={() => sendChatMessage()}>Login</button>
      <ChatHistory />
    </div>
  )
}

export default ChatClient
