import * as React from 'react'
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
