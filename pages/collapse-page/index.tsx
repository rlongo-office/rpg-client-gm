import * as React from 'react'
import ImageWrapper from '../../components/Image/image-wrapper'
import { styleObj } from '../../styles/styles'

import useViewport from '../../hooks/useViewport'
import GameObjEditor from '../../components/gm-ui/game-obj-editor'
import { useAppContext } from '@context/app-provider'

function CollapsePage() {
  const { images } = useAppContext()
  const { devWidth, devHeight } = useViewport()

  // I PROMISE I will put this in APPCONTEXT
  const imageProps = {
    imgSource: images,
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
