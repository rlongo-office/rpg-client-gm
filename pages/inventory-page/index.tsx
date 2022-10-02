import * as React from 'react'
import UIParent from '../../components/blue-print/ui-parent'
import { useAppContext } from '../../context/app-provider'

function InventoryPage() {

  return (
    <div id="inventory-page">
      <UIParent pageType={`inventoryPage`}/>
    </div>
  )
}

export default InventoryPage