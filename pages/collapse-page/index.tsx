import * as React from 'react'
import UITopStatusBar from '../../components/blue-print/status-bar/ui-top-status-bar'
import UIParent from '../../components/blue-print/ui-parent'
import useViewport from '../../hooks/useViewport'
import { styleObj } from '../../styles/styles'
import PlayerBP from '../../data/collections/maps/bp-player-dnd-5-1.0.json'
import UINavbar from '../../components/blue-print/ui-nav-bar'
import MyMapTest from '../../components/Image/my-map-test'
import MapDrawTest from '../../components/Image/map-draw-test'

function CollapsePage() {
  const { devWidth, devHeight } = useViewport()
  React.useEffect(() => {}, [])

  return (
    <div style={{ ...styleObj[`TopFlexPage`], height: `${devHeight}px`, width: `${devWidth}px` }}>
      <UITopStatusBar {...PlayerBP.statusBar} />
      <MapDrawTest />
      <div className="overflow-control">
        <UIParent pageType={`playerPage`}></UIParent>
      </div>
      <div
        style={{
          ...styleObj[`HSpaced`],
          alignItems: 'center',
          height: '40px',
          backgroundColor: 'LightGray',
          bottom: '0',
        }}
      >
        <UINavbar />
      </div>
    </div>
  )
}

export default CollapsePage
