import * as React from 'react'
import { styleObj } from '../../../styles/styles'
import * as uiTypes from '../../../types/blue-print'
import UiPlayerStatus from './ui-player-status'
import UiEnvStatus from './ui-env-status'
import Image from 'next/image'
import UiPlayerCondition from './ui-player-condition'
import UiPlayerHealth from './ui-player-health'
import UIPlayerHealthText from './ui-player-health-text'
import UiEnvClock from './ui-env-clock'
import UiEnvTemp from './ui-env-temp'
import UiEnvVisibility from './ui-env-visibility'
import UIEnvWindText from './ui-env-wind-text'
import UiEnvWind from './ui-env-wind'
import UiEnvWeather from './ui-env-weather'

function UITopStatusBar2(section: uiTypes.UISectionObj) {
  return (
    <div style={styleObj[`${section.style}`]}>
      <UiPlayerCondition />
      <UiPlayerHealth />
      <UIPlayerHealthText />
      <UiEnvClock />
      <UiEnvWeather />
      <UiEnvWind />
      <UIEnvWindText/>
      <UiEnvVisibility />
      <UiEnvTemp />
    </div>
  )
}

export default UITopStatusBar2
