import * as React from 'react'
import { styleObj } from '../../../styles/styles'
import { useAppContext } from '../../../context/app-provider'
import * as uiTypes from '../../../types/blue-print'
import * as utils from '../../../utils/utils'
import Image from 'next/image'

function UIEnvWind() {
  return (
    <div>
      <Image alt="weather" src="/wind.png" height="100px" width="100px"></Image>
    </div>
  )
}

export default UIEnvWind
