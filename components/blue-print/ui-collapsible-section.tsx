import * as React from 'react'
import { styleObj } from '../../styles/styles'
import * as uiTypes from '../../types/blue-print'
import UITopStatusBar from './status-bar/ui-top-status-bar'
import UIData from './ui-data'
import UILoopSection from './ui-loop-section'
import UIMap from '../Image/ui-map'
import UIChatClient from '../chat/chat-client'
import UILoreClient from '../lore/lore-client'
import UISection from './ui-section'

let collapsible = {
  backgroundColor: 'DarkGray',
  color: 'black',
  cursor: 'pointer',
  padding: '12px',
  border: 'none',
  height: '30px',
  textAlign: 'center',
  outline: 'none',
  fontSize: '15px',
} as React.CSSProperties

let activeCollapsible = { backgroundColor: 'darkGray' }

let contentHidden = {
  padding: '0 18px',
  display: 'none',
  overflow: 'hidden',
  backgroundColor: '#f1f1f1',
} as React.CSSProperties

let contentVisible = {
  padding: '0 18px',
  display: 'block',
  overflow: 'hidden',
  backgroundColor: '#f1f1f1',
} as React.CSSProperties

function UICollapsibleSection(section: uiTypes.UISectionObj) {
  const [isExpanded, setIsExpanded] = React.useState(false)
  const [childStyle, setChildStyle] = React.useState(contentHidden)
  const [parentStyle, setParentStyle] = React.useState(collapsible)
  //const [childSection, setChildSection] = React.useState(section.child[0])

  const toggleVisbility = () => {
    if (isExpanded) {
      setIsExpanded(false)
      setChildStyle(contentHidden)
    } else {
      setIsExpanded(true)
      setChildStyle(contentVisible)
    }
  }

  React.useEffect(() => {}, [childStyle])

  return (
    <div style={styleObj[`${section.style}`]}>
      <button type="button" style={styleObj[`SectionButton`]} onClick={toggleVisbility}>
        {section?.label.length > 0 ? section.label : 'section'}
      </button>
      <div style={childStyle}>
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
          ) : obj.type === 'lore-client' ? (
            <UILoreClient {...obj} key={`UI-lore-client-${rowIndex}`} />
          ) : (
            <UIData {...obj} key={`UI-Data-${rowIndex}`} />
          )
        )}
      </div>
    </div>
  )
}

export default UICollapsibleSection
