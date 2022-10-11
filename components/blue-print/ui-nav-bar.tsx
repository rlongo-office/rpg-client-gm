import React, { useEffect, useState, useRef } from 'react'
import { styleObj } from '../../styles/styles'

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
      <a id="nav-player" href="\player-sheet">
        <img src="/nav/player.png"></img>
      </a>
      <a id="nav-skill" href="\skills-page">
        <img src="/nav/skills.png"></img>
      </a>
      <a id="nav-inventory" href="\inventory-page">
        <img src="/nav/inventory.png"></img>
      </a>
      <a id="nav-chat" href="\chat-page">
        <img src="/nav/chat.png"></img>
      </a>
      <a id="nav-map" href="\map-page">
        <img src="/nav/map.png"></img>
      </a>
      <a id="nav-lore" href="\lore-page">
        <img src="/nav/lore.png"></img>
      </a>
    </div>
  )
}

export default UINavbar
