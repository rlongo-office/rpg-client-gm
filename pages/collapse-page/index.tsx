import * as React from 'react'
import ImageWrapper from '../../components/Image/image-wrapper'
import { styleObj } from '../../styles/styles'

import useViewport from '../../hooks/useViewport'
import GameObjEditor from '../../components/gm-ui/game-obj-editor'

function CollapsePage() {
  const { devWidth, devHeight } = useViewport()

  const imageProps = {
    imgSource: 'world-map',
    sourceType: 2,
    accelRate: 1,
    maxPanRate: 5,
    zoomRate: 0.025,
    zoomMax: 4,
    fHeight: 340,
    fWidth: 340,
    style: styleObj['imgStyleProp'],
  }

  return (
    <div style={{ border: '10px black', height: `${devHeight}px`, width: `${devWidth}px` }}>
      <div style={{ ...styleObj[`TopFlexPage`] }}>
        <ImageWrapper {...imageProps} />
        <GameObjEditor></GameObjEditor>
      </div>
    </div>
  )
}

export default CollapsePage
