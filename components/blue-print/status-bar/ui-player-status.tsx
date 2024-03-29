import * as React from 'react'
import { styleObj } from '../../../styles/styles'
import { useAppContext } from '../../../context/app-provider'
import * as uiTypes from '../../../types/blue-print'
import * as utils from '../../../utils/utils'
import UiPlayerHealth from './ui-player-health'
import UiPlayerCondition from './ui-player-condition'
import UIPlayerHealthText from './ui-player-health-text'

function UIPlayerStatus() {
  return (
    <div style={styleObj[`HSpaced`]}>
      <UiPlayerCondition />
      <UiPlayerHealth />
      <UIPlayerHealthText/>
    </div>
  )
}

export default UIPlayerStatus
