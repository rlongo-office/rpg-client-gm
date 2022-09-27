import * as React from 'react'
import { styleObj } from '../../../styles/styles'
import { useAppContext } from '../../../context/app-provider'
import * as uiTypes from '../../../types/blue-print'
import * as utils from '../../../utils/utils'
import UiEnvClock from './ui-env-clock'
import UiEnvWeather from './ui-env-weather'
import UiEnvWind from './ui-env-wind'
import UiEnvVisibility from './ui-env-visibility'
import UiEnvTemp from './ui-env-temp'

function UIEnvStatus() {
  return (
    <div style={styleObj[`HSpaced`]}>
      <UiEnvWeather />
      <UiEnvWind />
      <UiEnvVisibility />
      <UiEnvClock />
      <UiEnvTemp />
    </div>
  )
}

export default UIEnvStatus
