import * as React from 'react'
import * as types from '../../types/rpg-types'
import { useAppContext } from '../../context/app-provider'
import useStomp from '../../hooks/useStomp'
import * as gameTypes from '../../types/rpg-types'
import { styleObj } from '../../styles/styles'

function loreMessage(textMessage: gameTypes.textMessage ) {
  
  return (
    <div id = {`${textMessage.id}`}>
      <div id='lore-text-body' style={styleObj[`loreClientText`]}>{textMessage.text}</div>
    </div>
  )
}

export default loreMessage