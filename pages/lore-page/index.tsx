import * as React from 'react'
import UIParent from '../../components/blue-print/ui-parent'
import { useAppContext } from '../../context/app-provider'

function WorldPage() {

  return (
    <div id="lore-page">
      <UIParent pageType={`lorePage`}/>
    </div>
  )
}

export default WorldPage