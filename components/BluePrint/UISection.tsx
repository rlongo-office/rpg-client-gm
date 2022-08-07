import * as React from 'react'
import { Box, HStack, VStack, SimpleGrid, Flex } from '@chakra-ui/react'
import heart from '../../../public/heart.png'
import Image from 'next/image'
import { styleObj } from '../../styles/styles'
import { useAppContext } from '../../context/AppProvider'
import * as uiTypes from '../../types/blue-print'
import UIData from './UIData'

interface props {
  section: uiTypes.UISectionObj
}

function UISection(section: uiTypes.UISectionObj) {
  return (
    <div style={styleObj[`${section.style}`]}>
      {section && section.label.length > 0 && <div>{section.label}</div>}
      {section.child &&
        section.child.length > 0 &&
        section.child.map((row: any, rowIndex: number) =>
          row.type === 'section' ? <UISection {...row} /> : <UIData {...row} />
        )}
    </div>
  )
}

/*
    <div style={styleObj[`${section.type}`]}>
      {section.child.length > 0 && 
      section.child.map((row: any, rowIndex: number) => (
        row.type === 'section' ? <UISection {...row}></UISection> : <UIData {...row}></UIData>
        ))
      }
    </div>
*/
export default UISection
