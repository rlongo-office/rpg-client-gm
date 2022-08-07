import * as React from 'react'
import { Box, HStack, VStack, SimpleGrid, Flex } from '@chakra-ui/react'
import {
  abilityBox,
  abilityStat,
  midStatBox,
  ParentDiv,
  roundSquareStat,
  squareStat,
} from '../../../styles/styles-test'

function StatComponent() {
  return (
    <div style={ParentDiv} id="parent-stat-component">
      <VStack>
        <Box>
          <HStack>
            <Box style={squareStat}>
              <a>Initiative 2</a>
            </Box>

            <Box style={squareStat}>
              <VStack>
                <a>Hitpoints</a>
              </VStack>
            </Box>
            <Box style={squareStat}>
              <a>Speed</a>
            </Box>
          </HStack>
        </Box>
        <Box style={midStatBox}>
          <HStack style={{ display: 'flex', justifyContent: 'center' }}>
            <Box style={roundSquareStat}>
              <VStack>
                <a>Hit Dice</a>
                <a>1d8</a>
              </VStack>
            </Box>
            <Box style={roundSquareStat}>
              <VStack>
                <a>Armor Class</a>
                <a>13</a>
              </VStack>
            </Box>
            <Box style={roundSquareStat}>
              <VStack>
                <a>Proficiency</a>
                <a>+2</a>
              </VStack>
            </Box>
          </HStack>
        </Box>
        <Box style={abilityBox}>
          <HStack>
            <VStack>
              <Box style={abilityStat}>
                <VStack>
                  <a>Strength</a>
                  <a>14 +2 +2</a>
                </VStack>
              </Box>
              <Box style={abilityStat}>
                <VStack>
                  <a>Dexterity</a>
                  <a>15 +2 +4</a>
                </VStack>
              </Box>
              <Box style={abilityStat}>
                <VStack>
                  <a>Constitution</a>
                  <a>14 +2 +2</a>
                </VStack>
              </Box>
            </VStack>
            <VStack>
              <Box style={abilityStat}>
                <VStack>
                  <a>Intelligence</a>
                  <a>8 -1 +1</a>
                </VStack>
              </Box>
              <Box style={abilityStat}>
                <VStack>
                  <a>Wisdom</a>
                  <a>14 +2 +2</a>
                </VStack>
              </Box>
              <Box style={abilityStat}>
                <VStack>
                  <a>Charisma</a>
                  <a>10 0 0</a>
                </VStack>
              </Box>
            </VStack>
          </HStack>
        </Box>
      </VStack>
    </ParentDiv>
  )
}

export default StatComponent
