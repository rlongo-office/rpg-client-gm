import * as React from 'react'
import heart from '../../../public/heart.png'
import Image from 'next/image'
import { styleObj } from '../../styles/styles'
import { useAppContext } from '../../context/AppProvider'
import * as uiTypes from '../../types/blue-print'
import * as utils from '../../components/DataTable/TableBody/utils'

interface props {
  section: uiTypes.UIDataObj
}

function UIData(section: uiTypes.UIDataObj) {
  const { players } = useAppContext()
  let data =
    section.type == 'data-key'
      ? utils.getObjValue(players[0], `${section.source}.${section.data}`, 0)
      : utils.getObjValue(players[0], section.data, 0)



  const sendDataMessage = (event: React.MouseEvent<HTMLDivElement>) => {
    console.log(section.message)
  }


  return (
    <div
      style={styleObj[`${section.style}`]}
      {...(section.clickable && { onClick: sendDataMessage })}
    >
      {section.label.length > 0 && <div>{section.label}</div>}
      <div>{data}</div>
    </div>
  )
}

export default UIData
