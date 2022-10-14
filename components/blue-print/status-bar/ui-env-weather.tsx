import * as React from 'react'
import { styleObj } from '../../../styles/styles'
import { useAppContext } from '../../../context/app-provider'
import * as uiTypes from '../../../types/blue-print'
import * as utils from '../../../utils/utils'
import Image from 'next/image'

function UIEnvWeather() {
  return (
    <div >
      <img alt="weather" src="/storm-heavy-rain.png" height="30px" width="30px"></img>
    </div>
  )
}

export default UIEnvWeather
