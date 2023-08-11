import * as React from 'react'
import * as gameTypes from '../../types/rpg-types'
import { styleObj } from '../../styles/styles'

function loreMessage(textMessage: gameTypes.TextMessage) {
  return (
    <div id={`${textMessage.id}`}>
      <div id="lore-text-body" style={styleObj[`loreClientText`]}>
        {textMessage.text}
      </div>
    </div>
  )
}

export default loreMessage
