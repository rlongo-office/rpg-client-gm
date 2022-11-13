import * as React from 'react'
import * as types from '../../types/rpg-types'
import { useAppContext } from '../../context/app-provider'
import useStomp from '../../hooks/use.stomp'
import ChatMessage from './chat-message'
import ChatRecipients from './chat-recipients'
import ChatHistory from './chat-history'
import ChatEntry from './chat-entry'

function ChatClient() {
  return (
    <div id="chat-client">
      <ChatRecipients />
      <ChatEntry />
      <ChatHistory />
    </div>
  )
}

export default ChatClient
