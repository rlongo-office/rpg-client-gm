import * as React from 'react'
import { styleObj } from '../../../styles/styles'
import { useAppContext } from '../../../context/app-provider'
import * as uiTypes from '../../../types/blue-print'
import * as utils  from '../../../utils/utils'


function UIPlayerHealthText() {
    return (
        <div style={styleObj['defaultText']} >
          <div >
          10 HP
          </div>
        </div>
      )
}

export default UIPlayerHealthText