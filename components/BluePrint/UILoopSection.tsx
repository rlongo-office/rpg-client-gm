import * as React from 'react'
import heart from '../../../public/heart.png'
import Image from 'next/image'
import { styleObj } from '../../styles/styles'
import { useAppContext } from '../../context/AppProvider'
import * as uiTypes from '../../types/blue-print'
import UIData from './UIData'
import Section from '../Section'
import * as utils from '../../components/DataTable/TableBody/utils'
import UISection from './UISection'

interface props {
  section: uiTypes.UISectionObj
}

function UILoopSection(section: uiTypes.UISectionObj) {
  const { players } = useAppContext()
  //we need to create new child Data sections based on this loop section parameters
  let childArray: uiTypes.UISectionObj[] | uiTypes.UIDataObj[] = [] //an array of sections with it's child data elements
  const list = utils.getObjValue(players[0], section.child[0].data, 0)

  list.map((obj: any, index: number) => {
    let tempListSection = utils.deepCopy(section.child[0])
    let dataSecArray: uiTypes.UIDataObj[] = []
    //Creat an array of data sections...
    section.child[0].child?.forEach(e => {
      let dataPath = `${section.child[0].data}[${index}].${e.data}`
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
