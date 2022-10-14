import * as React from 'react'

import LoreHistory from './lore-history'
import LoreSearch from './lore-search'

function LoreClient() {
  return (
    <div id="chat-client">
      <LoreSearch />
      <LoreHistory />
    </div>
  )
}

export default LoreClient