import { useAppContext } from '@context/app-provider'
import * as React from 'react'
import ChatMessage from './chat-message'

function ChatHistory() {
  const { textHistory } = useAppContext()
  return (
    <div style={{ borderColor: 'blue', overflowY: 'auto', height: '200px', width: '370px' }}>
      {textHistory.map((row: any, rowIndex: number) => (
        <div id={`row-id-${rowIndex}`} key={`row-key-${rowIndex}`}>
          <ChatMessage {...row} />
        </div>
      ))}
    </div>
  )
}

export default ChatHistory
