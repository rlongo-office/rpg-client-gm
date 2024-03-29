import * as React from 'react'
import UITopStatusBar from '../../components/blue-print/status-bar/ui-top-status-bar'
import UIParent from '../../components/blue-print/ui-parent'
import useViewport from '../../hooks/useViewport'
import { styleObj } from '../../styles/styles'
import PlayerBP from '../../data/collections/maps/bp-player-dnd-5-1.0.json'
import UINavbar from '../../components/blue-print/ui-nav-bar'

function InventoryPage() {
  const { devWidth, devHeight } = useViewport()

  return (
    <div style={{ ...styleObj[`TopFlexPage`], height: `${devHeight}px`, width: `${devWidth}px` }}>
      <UITopStatusBar {...PlayerBP.statusBar} />
      <div className="overflow-control">
        <UIParent pageType={`inventoryPage`}></UIParent>
      </div>
      <UINavbar />
    </div>
  )
}

export default InventoryPage
