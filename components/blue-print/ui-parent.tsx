import * as React from 'react'
import { useAppContext } from '../../context/app-provider'
import ChatClient from '../chat/chat-client'
import ChatHistory from '../chat/chat-history'
import UISection from './ui-section'

function UIParent() {
  const { playerBP } = useAppContext()
  return (
    <div>
      <UISection {...playerBP.top} />
      <ChatClient></ChatClient>
    </div>
  )
}

export default UIParent
