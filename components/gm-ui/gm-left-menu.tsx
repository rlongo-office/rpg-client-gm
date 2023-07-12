import * as React from 'react'
import { styleObj } from '../../styles/styles'



function GMLeftMenu() {

  return (
      <div style={{ ...styleObj[`VSTACK`],backgroundColor:"lightBlue",borderStyle:'solid'}}>
        <div>Player</div>
        <div>World</div>
        <div>Encounter</div>
        <div>Storyline</div>
      </div>

  )
}

export default GMLeftMenu
