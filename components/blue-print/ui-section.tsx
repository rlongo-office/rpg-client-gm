import * as React from 'react'
import { styleObj } from '../../styles/styles'
import * as uiTypes from '../../types/blue-print'
import UITopStatusBar from './status-bar/ui-top-status-bar'
import UIData from './ui-data'
import UILoopSection from './ui-loop-section'
import UIMap from '../Image/ui-world-map'
import UIChatClient from '../chat/chat-client'
import UILoreClient from '../lore/lore-client'
import UICollapsibleSection from './ui-collapsible-section'
import UIWorldMap from '../Image/ui-world-map'
import UITacticalMap from '../Image/ui-tactical-map'
import UIRegionMap from '../Image/ui-region-map'

function UISection(section: uiTypes.UISectionObj) {
  //Add function a switch for the types of components


  return (
    <div style={styleObj[`${section.style}`]}>
      {section?.label.length > 0 && <div>{section.label}</div>}
      {section?.child?.map((obj: any, rowIndex: number) =>
        obj.type === 'section' ? (
          <UISection {...obj} key={`UI-Section-${rowIndex}`} />
        ) : obj.type === 'collapse-section' ? (
          <UICollapsibleSection {...obj} key={`UI-collapse-Section-${rowIndex}`} />
        ) : obj.type === 'section-loop-top' ? (
          <UILoopSection {...obj} key={`UI-Loop-Section-${rowIndex}`} />
        ) : obj.type === 'status-bar' ? (
          <UITopStatusBar {...obj} key={`UI-Top-Status-Bar-${rowIndex}`} />
        ) : obj.type === 'world-map' ? (
          <UIWorldMap {...obj} key={`UI-world-map-${rowIndex}`} />
        ) : obj.type === 'region-map' ? (
          <UIRegionMap {...obj} key={`UI-region-map-${rowIndex}`} />
        ) : obj.type === 'tactical-map' ? (
          <UITacticalMap {...obj} key={`UI-tactical-map-${rowIndex}`} />
        ) : obj.type === 'chat-client' ? (
          <UIChatClient {...obj} key={`UI-chat-client-${rowIndex}`} />
        ) : obj.type === 'lore-client' ? (
          <UILoreClient {...obj} key={`UI-lore-client-${rowIndex}`} />
        ) : (
          <UIData {...obj} key={`UI-Data-${rowIndex}`} />
        )
      )}
      
    </div>
  )
}

export default UISection

/*        ) : obj.type === 'world-map' ? (
          <UIWorldMap {...obj} key={`UI-world-map-${rowIndex}`} />
        ) : obj.type === 'region-map' ? (
          <UIRegionMap {...obj} key={`UI-region-map-${rowIndex}`} />
        ) : obj.type === 'tactical-map' ? (
          <UITacticalMap {...obj} key={`UI-tactical-map-${rowIndex}`} /> */