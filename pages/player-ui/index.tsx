import * as React from 'react'
import UIParent from '../../components/BluePrint/UIParent'
import StatComponent from '../../components/DataTable/StatComponent/StatComponent'
import StatComponentSimple from '../../components/DataTable/StatComponent/StatComponentSimple'
import {styleObj} from  '../../styles/styles'

function PlayerUI() {
  return (
    <div style={styleObj[`HSpaced`]}>
      <UIParent></UIParent>
      <StatComponentSimple></StatComponentSimple>
    </div>
  )
}

export default PlayerUI
