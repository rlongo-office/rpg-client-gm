import * as React from 'react'
import { styleObj } from '../../../styles/styles'
import { useAppContext } from '../../../context/app-provider'
import * as uiTypes from '../../../types/blue-print'
import * as utils  from '../../../utils/utils'

function UIEnvClock() {
  return <div style={styleObj['defaultText']}>10:35pm</div>
}

export default UIEnvClock