import * as React from 'react'
import { useAppContext } from '../../context/app-provider'
import ChatClient from '../chat/chat-client'
import UISection from './ui-section'

function UIParent({ pageType }: { pageType: string }) {
  const { playerBP } = useAppContext()
  return (
    <div>
      <UISection {...playerBP[pageType]} />
    </div>
  )
}

export default UIParent
