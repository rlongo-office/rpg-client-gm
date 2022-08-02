import * as React from 'react'
import styled from '@emotion/styled'

export const ParentDiv = {
  padding: '2px',
  backgroundColor: 'black',
  width: '370px',
  alignment: 'center',
  font: '16px bolder',
  display: 'flex',
  justifyContent: 'space-evenly',
}

export const vertStack = {
  width: '350px',
} as React.CSSProperties

export const abilityBox = {
  padding: '5px',
  border: '2px solid',
  borderColor: 'blue',
  backgroundColor: '#d9f2e6',
  borderRadius: '10px',
  width: '100%',
  alignment: 'center',
} as React.CSSProperties

export const midStatBox = {
  padding: '2px',
  border: '2px solid',
  borderColor: 'purple',
  backgroundColor: 'LightSteelBlue',
  borderRadius: '10px',
  width: '100%',
  alignment: 'center',
} as React.CSSProperties

export const topStatBox = {
  padding: '2px',
  border: '2px solid',
  borderColor: 'blue',
  backgroundColor: '#d9f2e6',
  borderRadius: '10px',
  width: '300px',
} as React.CSSProperties

export const hStack = {
  alignment: 'center',
} as React.CSSProperties

export const abilityStat = {
  margin: '3px',
  padding: '5px',
  border: '1px solid',
  borderColor: 'black',
  borderRadius: '10px',
  width: '150px',
  height: '60px',
  backgroundColor: 'beige',
  fontWeight: '900',
  fontSize: '20px',
} as React.CSSProperties

export const roundSquareStat = {
  margin: '2px',
  paddingTop: '20px',
  border: '1px solid',
  borderColor: 'blue',
  borderRadius: '30px',
  padding: '2',
  width: '90px',
  height: '90px',
  backgroundColor: 'beige',
} as React.CSSProperties

export const squareStat = {
  margin: '2px',
  paddingTop: '20px',
  border: '1px solid Green',
  borderRadius: '10px',
  padding: '2',
  width: '90px',
  height: '90px',
  backgroundColor: 'beige',
} as React.CSSProperties

export const squareStatSmall = {
  ...squareStat,
  height: '50px',
  fontWeight: '900',
  width: '50px',
  border: '1px solid Green',
  borderRadius: '10px',
  paddingTop: '5px',
  backgroundColor: 'beige',
} as React.CSSProperties

export const squareStatSpell = {
  border: '3px solid Purple',
  fontWeight: '900',
  font: '25px',
  height: '50px',
  borderRadius: '10px',
  backgroundColor: 'white',
  margin: '2px',
  paddingLeft: '10px',
  paddingRight: '10px',
} as React.CSSProperties

export const squareTitleSpell = {
  ...squareStatSpell,
  fontSize: '20px',
  backgroundColor: 'Pink',
  border: '4px solid Purple',
  height: ' 30px',
  width: '100%',
} as React.CSSProperties

export const squareLineSpell = {
  ...squareTitleSpell,
  textAlign: 'center',
  backgroundColor: 'LightBlue',
  border: '4px solid Blue',
  height: '30px',
  width: '80%',
  borderRadius: '15px',
} as React.CSSProperties

export const skillBox = {
  margin: '3px',
  padding: '5px',
  border: '1px solid',
  borderColor: 'black',
  borderRadius: '10px',
  width: '175px',
  backgroundColor: 'white',
} as React.CSSProperties

export const skillStatBox = {
  margin: '2px',
  fontSize: '18px',
  paddingLeft: '10px',
  paddingRight: '10px',
  border: '1px solid',
  borderColor: 'Blue',
  borderRadius: '5px',
  width: '100%',
  height: '25px',
  backgroundColor: 'lightCyan',
  display: 'flex',
  justifyContent: 'space-between',
} as React.CSSProperties

export const skillTitle = {
  margin: '1px',
  paddingLeft: '10px',
  paddingRight: '10px',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-evenly',
  fontWeight: '900',
  fontSize: '18px',
} as React.CSSProperties

export const HSpaced = {
  display: 'flex',
  justifyContent: 'space-evenly',
  width: '100%',
  margin: '2px',
} as React.CSSProperties

export const VSpaced = {
  justifyContent: 'space-evenly',
  width: '100%',
  margin: '2px',
} as React.CSSProperties

export const HSpacedSqueeze = {
  ...HSpaced,
  justifyContent: 'center',
} as React.CSSProperties

export const attackBox = {
  fontSize: '18px',
  paddingLeft: '10px',
  paddingRight: '10px',
  border: '1px solid',
  borderColor: 'orange',
  borderRadius: '20px',
  height: '25px',
  backgroundColor: 'beige',
  display: 'flex',
  alignText: 'center',
} as React.CSSProperties

export const attackBoxLong = { ...attackBox, width: '50%' } as React.CSSProperties
export const attackBoxShort = { ...attackBox, width: '25%' } as React.CSSProperties
export const attackBoxSquare = {
  ...attackBox,
  border: '1px solid Brown',
  borderRadius: '0px',
  backgroundColor: 'Pink',
  fontSize: '24px',
  paddingLeft: '25px',
  paddingRight: '25px',
} as React.CSSProperties

export const inventoryBox = {
  fontSize: '24px',
} as React.CSSProperties

export const inventoryBoxLong = {
  ...inventoryBox,
  width: '60%',
  paddingLeft: '5px',
} as React.CSSProperties

export const inventoryBoxShort = {
  ...inventoryBox,
  width: '20%',
} as React.CSSProperties

export const skillStat = {
  width: '50%',
} as React.CSSProperties

export const squareTitleBox = {
  fontWeight: '900',
  fontSize: '25px',
  backgroundColor: 'LightGreen',
  border: '4px solid Green',
  height: ' 40px',
  width: '100%',
  textAlign: 'center',
} as React.CSSProperties

export default { abilityBox, abilityStat, hStack, ParentDiv }
