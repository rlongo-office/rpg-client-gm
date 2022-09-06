import * as React from 'react'
import { styleObj } from '../../styles/styles'
import * as uiTypes from '../../types/blue-print'

function UITopStatusBar(section: uiTypes.UISectionObj) {
  return <div style={styleObj[`${section.style}`]} />
}

export default UITopStatusBar
