import * as React from 'react'
import { Box, HStack, VStack, SimpleGrid, Flex } from '@chakra-ui/react'
import heart from '../../../public/heart.png'
import Image from 'next/image'
import {
  abilityBox,
  abilityStat,
  attackBox,
  attackBoxLong,
  attackBoxShort,
  attackBoxSquare,
  HSpaced,
  HSpacedSqueeze,
  inventoryBox,
  inventoryBoxLong,
  inventoryBoxShort,
  midStatBox,
  ParentDiv,
  roundSquareStat,
  skillBox,
  skillStat,
  skillStatBox,
  skillTitle,
  squareLineSpell,
  squareStat,
  squareStatSmall,
  squareStatSpell,
  squareTitleBox,
  squareTitleSpell,
  StateImageBox,
  vertStack,
  VSpaced,
} from '../../styles/styles-test'
import { useAppContext } from '../../context/AppProvider'
import * as uiTypes from '../../types/blue-print'
import UISection from './UISection'

function UIParent() {
    const {playerBP} = useAppContext()
  return (
  <>
    <UISection {...playerBP.top}></UISection>
  </>)
}

export default UIParent

//<UISection {...playerBP.top}></UISection>
