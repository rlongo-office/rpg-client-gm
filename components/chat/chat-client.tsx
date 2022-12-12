import * as React from 'react'
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
