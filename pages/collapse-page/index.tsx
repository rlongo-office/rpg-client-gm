import * as React from 'react'
import ImageWrapper from '../../components/Image/image-wrapper'
import { styleObj } from '../../styles/styles'
import useViewport from '../../hooks/useViewport'
import UiObjTreeEditor from '../../components/gm-ui/ui-obj-tree-editor'
import { useAppContext } from '../../context/app-provider'
import GMUIPopupEntry from '../../components/gm-ui/gm-ui-popup-entry'

function CollapsePage() {
  const { devWidth, devHeight } = useViewport()
  const [usePopup, setUsePopup] = React.useState(false)
  const { players } = useAppContext()

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
        <button style={{width:'100px'}} onClick={() => setUsePopup(true)}>Open Popup</button>
        <GMUIPopupEntry trigger={usePopup} setTrigger={setUsePopup}>
          <h3>My popup</h3>
        </GMUIPopupEntry>
        <UiObjTreeEditor source={players[0]} />
      </div>
    </div>
  )
}

export default CollapsePage
