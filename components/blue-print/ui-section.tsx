import * as React from 'react'
import { styleObj } from '../../styles/styles'
import * as uiTypes from '../../types/blue-print'
import UITopStatusBar from './status-bar/ui-top-status-bar'
import UIData from './ui-data'
import UILoopSection from './ui-loop-section'
import UIChatClient from '../chat/chat-client'
import UILoreClient from '../lore/lore-client'
import ImageWrapper from '@components/Image/image-wrapper'
import UICollapsibleSection from './ui-collapsible-section'
import UIWorldMap from '../Image/ui-world-map'
import UITacticalMap from '../Image/ui-tactical-map'
import UIRegionMap from '../Image/ui-region-map'
import { debug } from 'console'
import { useAppContext } from '@context/app-provider'

/*TODO: REMOVE THIS AFTER TEST
 */

function UISection({ style, label, child }: uiTypes.UISectionObj) {
  const { images } = useAppContext()
  //TEST CODE
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
  //END OF TEST CODE

  return (
    <div style={styleObj[`${style}`]}>
      {label.length > 0 && <div>{label}</div>}
      {child?.map((obj: any, rowIndex: number) => {
        if (obj && obj.type) {
          switch (obj.type) {
            case 'section':
              // debugger
              // return <div key={`UI-Section-${rowIndex}`}>SECTION</div>
              // return <UICollapsibleSection {...obj} key={`UI-collapse-Section-${rowIndex}`} />
              return <UISection {...obj} key={`UI-Section-${rowIndex}`} />
            case 'collapse-section':
              return <UICollapsibleSection {...obj} key={`UI-collapse-Section-${rowIndex}`} />
            case 'section-loop-top':
              return <UILoopSection {...obj} key={`UI-Loop-Section-${rowIndex}`} />
            case 'status-bar':
              return <UITopStatusBar {...obj} key={`UI-Top-Status-Bar-${rowIndex}`} />
            case 'world-map':
            case 'region-map':
            case 'tactical-map':
              return <ImageWrapper {...imageProps} key={`UI-map-${rowIndex}`} />
            case 'chat-client':
              return <UIChatClient {...obj} key={`UI-chat-client-${rowIndex}`} />
            case 'lore-client':
              return <UILoreClient {...obj} key={`UI-lore-client-${rowIndex}`} />
            default:
              return <UIData {...obj} key={`UI-Data-${rowIndex}`} />
          }
        }
      })}
    </div>
  )
}

export default UISection
