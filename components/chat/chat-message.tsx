import { styleObj } from '@styles/styles'
import * as React from 'react'
import * as gameTypes from '../../types/rpg-types'

function ChatMessage(textMessage: gameTypes.TextMessage) {
  const formattedMText = `[${textMessage.sender}]: ${textMessage.text}`

  return (
    <div id={`${textMessage.id}`}>
      <div id="text-body" style={styleObj[`${textMessage.type}`]}>
        {formattedMText}
      </div>
    </div>
  )
}

export default ChatMessage
