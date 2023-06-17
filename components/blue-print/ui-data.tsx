import { useEffect } from 'react'
import { styleObj } from '../../styles/styles'
import { useAppContext } from '../../context/app-provider'
import * as uiTypes from '../../types/blue-print'
import * as utils from '../../utils/utils'

function UIData(section: uiTypes.UIDataObj) {
  const { myStats } = useAppContext()

  /*   let data =
    section.type == 'data-key'
      ? utils.getObjValue(myStats, `${section.source}.${section.data}`, 0)
      : utils.getObjValue(myStats, section.data, 0) */

  useEffect(() => {
    //make sure we get a rerender when the stats change at the app level
  }, [myStats])

  const sendDataMessage = (event: React.MouseEvent<HTMLDivElement>) => {
    console.log(section.message)
  }

  return (
    <div
      style={styleObj[`${section.style}`]}
      {...(section.clickable && { onClick: sendDataMessage })}
    >
      {section.label.length > 0 && <div>{section.label}</div>}
      <div>
        {myStats
          ? section.type == 'data-key'
            ? utils.getObjValue(myStats, `${section.source}.${section.data}`, 0)
            : utils.getObjValue(myStats, section.data, 0)
          : null}
      </div>
    </div>
  )
}

export default UIData
