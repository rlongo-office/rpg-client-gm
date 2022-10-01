import * as React from 'react'
import { styleObj } from '../../../styles/styles'
import { useAppContext } from '../../../context/app-provider'
import * as uiTypes from '../../../types/blue-print'
import * as utils  from '../../../utils/utils'


function UIPlayerHealth() {
  return <div>
    <img alt="weather" src="/heart.png" height="30px" width="30px"></img>
  </div>
}

export default UIPlayerHealth