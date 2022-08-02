export const parentDiv = {
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
}

export const abilityBox = {
  padding: '5px',
  border: '2px solid',
  borderColor: 'blue',
  backgroundColor: '#d9f2e6',
  borderRadius: '10px',
  width: '100%',
  alignment: 'center',
}

export const midStatBox = {
  padding: '2px',
  border: '2px solid',
  borderColor: 'purple',
  backgroundColor: 'LightSteelBlue',
  borderRadius: '10px',
  width: '100%',
  alignment: 'center',
}

export const topStatBox = {
  padding: '2px',
  border: '2px solid',
  borderColor: 'blue',
  backgroundColor: '#d9f2e6',
  borderRadius: '10px',
  width: '300px',
}

export const hStack = {
  alignment: 'center',
}

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
}

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
}

export const squareStat = {
  margin: '2px',
  paddingTop: '20px',
  border: '1px solid Green',
  borderRadius: '10px',
  padding: '2',
  width: '90px',
  height: '90px',
  backgroundColor: 'beige',
}

export const squareStatSmall = {
  ...squareStat,
  height: '50px',
  fontWeight: '900',
  width: '50px',
  border: '1px solid Green',
  borderRadius: '10px',
  paddingTop: '5px',
  backgroundColor: 'beige',
}

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
}

export const squareTitleSpell = {
  ...squareStatSpell,
  fontSize: '20px',
  backgroundColor: 'Pink',
  border: '4px solid Purple',
  height: ' 30px',
  width: '100%',
}

export const squareLineSpell = {
  ...squareTitleSpell,
  textAlign: 'center',
  backgroundColor: 'LightBlue',
  border: '4px solid Blue',
  height: '30px',
  width: '80%',
  borderRadius: '15px',
}

export const skillBox = {
  margin: '3px',
  padding: '5px',
  border: '1px solid',
  borderColor: 'black',
  borderRadius: '10px',
  width: '175px',
  backgroundColor: 'white',
}

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
}

export const skillTitle = {
  margin: '1px',
  paddingLeft: '10px',
  paddingRight: '10px',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-evenly',
  fontWeight: '900',
  fontSize: '18px',
}
export const HSpaced = {
  display: 'flex',
  justifyContent: 'space-evenly',
  width: '100%',
  margin: '2px',
}

export const VSpaced = {
  justifyContent: 'space-evenly',
  width: '100%',
  margin: '2px',
}

export const HSpacedSqueeze = {
  ...HSpaced,
  justifyContent: 'center',
}

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
}

export const attackBoxLong = { ...attackBox, width: '50%' }
export const attackBoxShort = { ...attackBox, width: '25%' }
export const attackBoxSquare = {
  ...attackBox,
  border: '1px solid Brown',
  borderRadius: '0px',
  backgroundColor: 'Pink',
  fontSize: '24px',
  paddingLeft: '25px',
  paddingRight: '25px',
}

export const inventoryBox= {
  fontSize: '24px'
}

export const inventoryBoxLong = {
  ...inventoryBox,
  width: '60%',
  paddingLeft: '5px'
}

export const inventoryBoxShort = {
  ...inventoryBox,
  width: '20%'
}

export const skillStat = {
  width: '50%',
}

export const squareTitleBox = {
  fontWeight: '900',
  fontSize: '25px',
  backgroundColor: 'LightGreen',
  border: '4px solid Green',
  height: ' 40px',
  width: '100%',
  textAlign: 'center'
}

export default { abilityBox, abilityStat, hStack, parentDiv }
