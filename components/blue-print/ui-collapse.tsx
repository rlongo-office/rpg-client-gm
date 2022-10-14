import * as React from 'react'
import { styleObj } from '../../styles/styles'
import * as uiTypes from '../../types/blue-print'
import UITopStatusBar from './status-bar/ui-top-status-bar'
import UIData from './ui-data'
import UILoopSection from './ui-loop-section'
import UIMap from '../Image/ui-world-map'
import UIChatClient from '../chat/chat-client'
import UILoreClient from '../lore/lore-client'

let collapsible = {
    backgroundColor: 'lightGray',
    color: 'white',
    cursor: 'pointer',
    padding: '18px',
    width: '100%',
    border: 'none',
    textAlign: 'left',
    outline: 'none',
    fontSize: '15px',
  } as React.CSSProperties

  let activeCollapsible = { backgroundColor: 'darkGray' }

  let contentHidden = {
    padding: "0 18px",
    display: "none",
    overflow: "hidden",
    backgroundColor: "#f1f1f1"
  } as React.CSSProperties
  
  let contentVisible = {
    padding: "0 18px",
    display: "block",
    overflow: "hidden",
    backgroundColor: "#f1f1f1"
  } as React.CSSProperties


function UICollapse() {
  
  const [ isExpanded, setIsExpanded ] = React.useState(false);
  const [ childStyle, setChildStyle ] = React.useState(contentHidden);
  const [ parentStyle, setParentStyle ] = React.useState(collapsible);

  const toggleVisbility = ()=>{
    if (isExpanded) {
        setIsExpanded(false)
        setChildStyle(contentHidden)
    } else {
        setIsExpanded(true)
        setChildStyle(contentVisible)
    }
  }

  React.useEffect(() => {

  },[childStyle])


  return (
    <>
      <button type="button" style={parentStyle} onClick= {toggleVisbility}>
        Open Collapsible
      </button>
      <div style={childStyle}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>

      <p>Collapsible Set:</p>
      <button type="button" className="collapsible">
        Open Section 1
      </button>
      <div className="content">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>
      <button type="button" className="collapsible">
        Open Section 2
      </button>
      <div className="content">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>
      <button type="button" className="collapsible">
        Open Section 3
      </button>
      <div className="content">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>
    </>
  )
}

export default UICollapse
