import * as React from 'react'
import { styleObj } from '../../../styles/styles'
import * as uiTypes from '../../../types/blue-print'
import UiPlayerStatus from './ui-player-status'
import UiEnvStatus from './ui-env-status'
import Image from 'next/image'

function UITopStatusBar(section: uiTypes.UISectionObj) {
  return (
    <div style={styleObj[`topStatusBar`]}>
      <UiPlayerStatus />
      <UiEnvStatus />
    </div>
  )
}

export default UITopStatusBar
//<div style={styleObj[`${section.style}`]}>
