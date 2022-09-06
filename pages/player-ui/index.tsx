import * as React from 'react'
import UIParent from '../../components/blue-print/ui-parent'
import StatComponentSimple from '../../components/data-table/stat-component-simple/stat-component-simple'
import { styleObj } from '../../styles/styles'

function PlayerUI() {
  return (
    <div style={styleObj[`HSpaced`]}>
      <UIParent></UIParent>
      <StatComponentSimple></StatComponentSimple>
    </div>
  )
}

export default PlayerUI
