import * as React from 'react'
import * as types from '../../types/rpg-types'
import { useAppContext } from '../../context/app-provider'
import useStomp from '../../hooks/useStomp'
import ChatMessage from './chat-message'
import ChatRecipients from './chat-recipients'
import ChatHistory from './chat-history'
import ChatText from './chat-entry'

function ChatClient() {
  return (
    <div id="chat-client">
      <ChatRecipients />
      <ChatText />
      <ChatHistory />
    </div>
  )
}

export default ChatClient
