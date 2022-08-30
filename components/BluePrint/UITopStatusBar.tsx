import * as React from 'react'
import { styleObj } from '../../styles/styles'
import { useAppContext } from '../../context/AppProvider'
import * as uiTypes from '../../types/blue-print'
import * as utils from '../../components/DataTable/TableBody/utils'
import UIEnvStatus from './UIEnvStatus'
import UIPlayerStatus from './UIPlayerStatus'

interface props {
  section: uiTypes.UISectionObj
}

function UITopStatusBar(section: uiTypes.UISectionObj) {
  return (
    <div style={styleObj[`${section.style}`]}>
      <UIPlayerStatus />
      <UIEnvStatus />
    </div>
  )
}

export default UITopStatusBar
