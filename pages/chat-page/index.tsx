import * as React from 'react'
import UIParent from '../../components/blue-print/ui-parent'
import { useAppContext } from '../../context/app-provider'

function chatPage() {

  return (
    <div id="inventory-page">
      <UIParent pageType={`chatPage`}/>
    </div>
  )
}

export default chatPage