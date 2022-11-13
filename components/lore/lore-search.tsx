import * as React from 'react'
import * as types from '../../types/rpg-types'
import { useAppContext } from '../../context/app-provider'
import useStomp from '../../hooks/use.stomp'
import { styleObj } from '../../styles/styles'

/* The search text component to submit a search against documents in the backend system */

function LoreSearch() {
  const submitSearch = () => {
    console.log('button clicked for lore search')
  }

  return (
    <div style={styleObj['HSpaced']}>
      <input type="text"></input>
      <button type="button" onClick={submitSearch}>
        Submit
      </button>
    </div>
  )
}

export default LoreSearch
