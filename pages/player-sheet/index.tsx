import * as React from 'react'
import UITopStatusBar from '../../components/blue-print/status-bar/ui-top-status-bar'
import UIParent from '../../components/blue-print/ui-parent'
import { styleObj } from '../../styles/styles'
import PlayerBP from '../../data/collections/maps/bp-player-dnd-5-1.0.json'

function PlayerUI() {
  return (
    <div style={styleObj[`VSpaced`]}>
      <UITopStatusBar {...PlayerBP.statusBar} />
      <UIParent pageType={`playerPage`}></UIParent>
      <div className="Footer--container">
        <button style={{ backgroundColor: 'DarkGray', color: 'white' }}>My footer</button>
      </div>
    </div>
  )
}

export default PlayerUI
