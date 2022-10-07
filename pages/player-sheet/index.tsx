import * as React from 'react'
import UIBottomNavbar from '../../components/blue-print/ui-bottom-navbar.jsx'
import UIParent from '../../components/blue-print/ui-parent'
import ChatClient from '../../components/chat/chat-client'
import StatComponentSimple from '../../components/data-table/stat-component-simple/stat-component-simple'
import { styleObj } from '../../styles/styles'

function PlayerUI() {
  return (
    <div style={styleObj[`VSpaced`]}>
      <UIParent pageType={`playerPage`}></UIParent>
      <div className="Footer--container">
        <button style={{ backgroundColor: 'DarkGray', color: 'white' }}>My footer</button>
      </div>
    </div>
  )
}

export default PlayerUI
