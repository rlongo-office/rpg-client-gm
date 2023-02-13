import * as React from 'react'
import { styleObj } from '../../styles/styles'
import { useAppContext } from '../../context/app-provider'
import * as uiTypes from '../../types/blue-print'
import * as utils from '../../utils/utils'
import UISection from './ui-section'

interface props {
  section: uiTypes.UISectionObj
}

type ChildType = uiTypes.UISectionObj | uiTypes.UIDataObj | undefined

function UILoopSection(section: uiTypes.UISectionObj) {
  const { players } = useAppContext()
  const firstChild: ChildType = section?.child ? section.child[0] : undefined
  // we need to create new child Data sections based on this loop section parameters

  // an array of sections with it's child data elements
  let childArray: uiTypes.UISectionObj[] | uiTypes.UIDataObj[] = []
  const list = utils.getObjValue(players[0], firstChild ? firstChild.data : '', 0)

  list.map((obj: any, index: number) => {
    let tempListSection = utils.deepCopy(firstChild)
    let dataSecArray: uiTypes.UIDataObj[] = []
    //Creat an array of data sections...
    firstChild?.child?.forEach(e => {
      let dataPath = `${firstChild ? firstChild.data : ''}[${index}].${e.data}`
      let tempDataSection = { ...e, data: dataPath, type: 'data', id: `${e.id}-${index}` }
      dataSecArray = [...dataSecArray, tempDataSection]
    })
    //...add that child data section array to a temp list section...
    tempListSection.child = dataSecArray
    //...and add that section to the child array
    childArray = [...childArray, tempListSection]
  })

  return (
    <div style={styleObj[`${section.style}`]}>
      {childArray.map((obj: any, rowIndex: number) => {
        return <UISection key={`${obj.index}-${rowIndex}`} {...obj} />
      })}
    </div>
  )
}

export default UILoopSection
