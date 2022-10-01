import * as React from 'react'
import * as types from '../../types/rpg-types'
import { useAppContext } from '../../context/app-provider'
import useStomp from '../../hooks/useStomp'
import * as gameTypes from '../../types/rpg-types'
import { styleObj } from '../../styles/styles'

function ChatMessage(textMessage: gameTypes.textMessage ) {

  const formattedMText = `[${textMessage.sender}]: ${textMessage.text}`
  
  return (
    <div id = {`${textMessage.id}`}>
      <div id='text-body' style={styleObj[`${textMessage.type}`]}>{formattedMText}</div>
    </div>
  )
}

export default ChatMessage