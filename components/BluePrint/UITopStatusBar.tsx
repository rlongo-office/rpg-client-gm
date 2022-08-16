import * as React from 'react'
import { styleObj } from '../../styles/styles'
import { useAppContext } from '../../context/AppProvider'
import * as uiTypes from '../../types/blue-print'
import * as utils from '../../components/DataTable/TableBody/utils'

interface props {
  section: uiTypes.UISectionObj
}

function UITopStatusBar(section: uiTypes.UISectionObj) {
  return (
    <div style={styleObj[`${section.style}`]}>
    </div>
  )
}

export default UITopStatusBar