import * as React from 'react'
import { styleObj } from '../../styles/styles'
import * as uiTypes from '../../types/blue-print'
import UITopStatusBar from './status-bar/ui-top-status-bar'
import UIData from './ui-data'
import UILoopSection from './ui-loop-section'
import UIMap from '../Image/ui-map'
import UIChatClient from '../chat/chat-client'

function UISection(section: uiTypes.UISectionObj) {
  return (
    <div style={styleObj[`${section.style}`]}>
      {section?.label.length > 0 && <div>{section.label}</div>}
      {section?.child?.map((obj: any, rowIndex: number) =>
        obj.type === 'section' ? (
          <UISection {...obj} key={`UI-Section-${rowIndex}`} />
        ) : obj.type === 'section-loop-top' ? (
          <UILoopSection {...obj} key={`UI-Loop-Section-${rowIndex}`} />
        ) : obj.type === 'status-bar' ? (
          <UITopStatusBar {...obj} key={`UI-Top-Status-Bar-${rowIndex}`} />
        ) : obj.type === 'world-map' ? (
          <UIMap {...obj} key={`UI-world-map-${rowIndex}`} />
        ) : obj.type === 'chat-client' ? (
          <UIChatClient {...obj} key={`UI-chat-client-${rowIndex}`} />
        ) :(
          <UIData {...obj} key={`UI-Data-${rowIndex}`} />
        )
      )}
    </div>
  )
}

export default UISection
