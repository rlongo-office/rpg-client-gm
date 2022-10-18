import * as React from 'react'

import useViewport from '../../hooks/useViewport'
import { styleObj } from '../../styles/styles'
import UIWorldMap from '../../components/Image/my-map-test'
function CollapsePage() {
  const { devWidth, devHeight } = useViewport()
  React.useEffect(() => {}, [])

  return (
    <div style={{ ...styleObj[`TopFlexPage`], height: `${devHeight}px`, width: `${devWidth}px` }}>
      <UIWorldMap />
    </div>
  )
}

export default CollapsePage
