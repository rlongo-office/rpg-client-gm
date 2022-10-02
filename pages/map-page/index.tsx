import * as React from 'react'
import UIParent from '../../components/blue-print/ui-parent'
import { useAppContext } from '../../context/app-provider'

function MapPage() {
  return (
    <div id="map-page">
      <UIParent pageType={`mapPage`}/>
    </div>
  )
}

export default MapPage