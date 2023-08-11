import React, { useEffect, useState, useRef } from 'react'
import UIParent from './ui-parent'
import UITopStatusBar from './status-bar/ui-top-status-bar'
import PlayerBP from '../../data/collections/maps/bp-player-dnd-5-1.0.json'
import { styleObj } from '../../styles/styles'
import { useViewportScroll } from 'framer-motion'
import useViewport from '../../hooks/useViewport'
import { usePageSwitching } from '../../hooks/usePageSwitching'
import { useRouter } from 'next/router'

const UIBottomNavbar = () => {
  const { devWidth, devHeight } = useViewport()
  const router = useRouter()

  /*   const navigateToPage = (path: String) => {
    router.push(path)
  }
 */
  const navigateToPage =(path: string)=> {
    router.push(path)
  }

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
        <button onClick={() => navigateToPage('/player-sheet')}>
          <img src="/nav/player.png" alt="Player" />
        </button>
        <button onClick={() => navigateToPage('/skills-page')}>
          <img src="/nav/skills.png" alt="Skills" />
        </button>
        <button onClick={() => navigateToPage('/inventory-page')}>
          <img src="/nav/inventory.png" alt="Inventory" />
        </button>
        <button onClick={() => navigateToPage('/chat-page')}>
          <img src="/nav/chat.png" alt="Chat" />
        </button>
        <button onClick={() => navigateToPage('/map-page')}>
          <img src="/nav/map.png" alt="Map" />
        </button>
        <button onClick={() => navigateToPage('/lore-page')}>
          <img src="/nav/lore.png" alt="Lore" />
        </button>
      </div>
    </div>
  )
}

export default UIBottomNavbar
