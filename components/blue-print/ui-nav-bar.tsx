import React, { useEffect, useState, useRef } from 'react'
import { styleObj } from '../../styles/styles'
import Link from 'next/link'

const UINavbar = () => {
  return (
    <div
      id="bottom-nav-bar"
      style={{
        ...styleObj[`HSpaced`],
        alignItems: 'center',
        height: '40px',
        backgroundColor: 'LightGray',
        bottom: '0',
      }}
    >
        <Link href="/player-sheet">
          <a>
            <img src="/nav/player.png" alt="Player" />
          </a>
        </Link>
        <Link href="/skills-page" >
          <a>
            <img src="/nav/skills.png" alt="Skills" />
          </a>
        </Link>
        <Link href="/inventory-page" >
          <a>
            <img src="/nav/inventory.png" alt="Inventory" />
          </a>
        </Link>
        <Link href="/chat-page" >
          <a>
            <img src="/nav/chat.png" alt="Chat" />
          </a>
        </Link>
        <Link href="/map-page" >
          <a>
            <img src="/nav/map.png" alt="Map" />
          </a>
        </Link>
        <Link href="/lore-page" >
          <a>
            <img src="/nav/lore.png" alt="Lore" />
          </a>
        </Link>
    </div>
  )
}

export default UINavbar
