import React, { useEffect, useState, useRef } from 'react'
import UIParent from './ui-parent'
import UITopStatusBar from './status-bar/ui-top-status-bar'
import PlayerBP from '../../data/collections/maps/bp-player-dnd-5-1.0.json'
import { styleObj } from '../../styles/styles'
import { useViewportScroll } from 'framer-motion'
import useViewport from '../../hooks/useViewport'

const UIBottomNavbar = () => {
  const { devWidth, devHeight } = useViewport()
  return (
    <div style={{ ...styleObj[`TopFlexPage`], height: `${devHeight}px`, width: `${devWidth}px` }}>
      <UITopStatusBar {...PlayerBP.statusBar} />
      <div className="overflow-control">
        <UIParent pageType={`playerPage`}></UIParent>
      </div>
      <div
        style={{
          ...styleObj[`HSpaced`],
          alignItems: 'center',
          height: '40px',
          backgroundColor: 'LightGray',
          bottom: '0',
        }}
      >
        <a id="short" href="\player-sheet">
          <img src="/nav/player.png" scale="0"></img>
        </a>
        <a id="short" href="\inventory-page">
          <img src="/nav/inventory.png" scale="0"></img>
        </a>
        <a id="short" href="\chat-page">
          <img src="/nav/chat.png" scale="0"></img>
        </a>
        <a id="short" href="\map-page">
          <img src="/nav/map.png" scale="0"></img>
        </a>
        <a id="short" href="\lore-page">
          <img src="/nav/lore.png" scale="0"></img>
        </a>
      </div>
    </div>
  )
}

export default UIBottomNavbar
