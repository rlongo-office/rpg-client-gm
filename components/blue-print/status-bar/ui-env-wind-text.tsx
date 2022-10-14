import * as React from 'react'
import { styleObj } from '../../../styles/styles'
import { useAppContext } from '../../../context/app-provider'
import * as uiTypes from '../../../types/blue-print'
import * as utils from '../../../utils/utils'
import Image from 'next/image'

function UIEnvWindText() {
  return (
    <div style={styleObj['defaultText']} >
      <div >
      10mph SSE
      </div>
    </div>
  )
}

export default UIEnvWindText