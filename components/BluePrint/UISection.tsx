import * as React from 'react'
import { Box, HStack, VStack, SimpleGrid, Flex } from '@chakra-ui/react'
import heart from '../../../public/heart.png'
import Image from 'next/image'
import { styleObj } from '../../styles/styles'
import { useAppContext } from '../../context/AppProvider'
import * as uiTypes from '../../types/blue-print'
import UIData from './UIData'
import Section from '../Section'
import * as utils from '../../components/DataTable/TableBody/utils'
import UILoopSection from './UILoopSection'

interface props {
  section: uiTypes.UISectionObj
}

function UISection(section: uiTypes.UISectionObj) {
  return (
    <div style={styleObj[`${section.style}`]}>
      {section && section.label.length > 0 && <div>{section.label}</div>}
      {section.child &&
        section.child.length > 0 &&
        section.child.map((obj: any, rowIndex: number) =>
          obj.type === 'section' ? (
            <UISection {...obj} />
          ) : obj.type === 'section-loop-top' ? (
            <UILoopSection {...obj}></UILoopSection>
          ) : (
            <UIData {...obj}></UIData>
          )
        )}
    </div>
  )
}


export default UISection
