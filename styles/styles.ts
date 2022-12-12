import * as React from 'react'

export let styleObj: any = {}

styleObj['ParentDiv'] = {
  padding: '2px',
  width: '100%',
  backgroundColor: 'gray',
  alignment: 'center',
  font: '16px bolder',
  //display: 'flex',
  justifyContent: 'space-evenly',
} as React.CSSProperties

styleObj['flexEvenlySection'] = {
  display: 'flex',
  justifyContent: 'space-evenly',
} as React.CSSProperties

styleObj['vertStack'] = {
  width: '100%',
} as React.CSSProperties

styleObj['abilityBox'] = {
  padding: '5px',
  border: '2px solid',
  borderColor: 'blue',
  backgroundColor: '#d9f2e6',
  borderRadius: '10px',
  width: '100%',
  alignment: 'center',
} as React.CSSProperties

styleObj['midStatBox'] = {
  padding: '2px',
  border: '2px solid',
  borderColor: 'purple',
  backgroundColor: 'LightSteelBlue',
  borderRadius: '10px',
  width: '100%',
  alignment: 'center',
} as React.CSSProperties

styleObj['topStatBox'] = {
  padding: '2px',
  border: '2px solid',
  borderColor: 'blue',
  backgroundColor: '#d9f2e6',
  borderRadius: '10px',
  width: '300px',
} as React.CSSProperties

styleObj['hStack'] = {
  alignment: 'center',
} as React.CSSProperties

styleObj['abilityStat'] = {
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
  textAlign: 'center',
} as React.CSSProperties

styleObj['roundSquareStat'] = {
  margin: '2px',
  paddingTop: '20px',
  border: '1px solid',
  borderColor: 'blue',
  borderRadius: '30px',
  padding: '2',
  width: '90px',
  height: '90px',
  backgroundColor: 'beige',
  textAlign: 'center',
} as React.CSSProperties

styleObj['squareStat'] = {
  margin: '2px',
  paddingTop: '20px',
  border: '1px solid Green',
  borderRadius: '10px',
  padding: '2',
  width: '90px',
  height: '90px',
  textAlign: 'center',
  backgroundColor: 'beige',
} as React.CSSProperties

styleObj['StateImageBox'] = {
  margin: '2px',
  paddingTop: '20px',
  width: '120px',
  height: '120px',
  backgroundImage: `url("/heart.png")`,
} as React.CSSProperties

styleObj['squareStatSmall'] = {
  ...styleObj['squareStat'],
  height: '50px',
  fontWeight: '900',
  width: '50px',
  border: '1px solid Green',
  borderRadius: '10px',
  paddingTop: '5px',
  backgroundColor: 'beige',
} as React.CSSProperties

styleObj['squareStatSpell'] = {
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

styleObj['squareTitleSpell'] = {
  ...styleObj['squareStatSpell'],
  fontSize: '20px',
  backgroundColor: 'Pink',
  border: '4px solid Purple',
  height: ' 30px',
  width: '100%',
} as React.CSSProperties

styleObj['squareLineSpell'] = {
  ...styleObj['squareStat'],
  textAlign: 'center',
  backgroundColor: 'LightBlue',
  border: '4px solid Blue',
  height: '30px',
  width: '80%',
  borderRadius: '15px',
} as React.CSSProperties

styleObj['skillBox'] = {
  margin: '3px',
  padding: '5px',
  border: '1px solid',
  borderColor: 'black',
  borderRadius: '10px',
  width: '175px',
  backgroundColor: 'white',
  textAlign: 'center',
  fontWeight: '900',
  fontSize: '18px',
} as React.CSSProperties

styleObj['skillStatBox'] = {
  margin: '2px',
  fontSize: '16px',
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

styleObj['skillTitle'] = {
  margin: '1px',
  paddingLeft: '10px',
  paddingRight: '10px',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-evenly',
  fontWeight: '900',
  fontSize: '18px',
} as React.CSSProperties

styleObj['HSpaced'] = {
  display: 'flex',
  justifyContent: 'space-evenly',
  width: '100%',
  margin: '2px',
} as React.CSSProperties

styleObj['VSpaced'] = {
  justifyContent: 'space-evenly',
  width: '100%',
  margin: '2px',
} as React.CSSProperties

styleObj['HSpacedSqueeze'] = {
  ...styleObj['HSpaced'],
  justifyContent: 'center',
} as React.CSSProperties

styleObj['attackBox'] = {
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

styleObj['attackBoxLong'] = { ...styleObj['attackBox'], width: '50%' } as React.CSSProperties
styleObj['attackBoxShort'] = { ...styleObj['attackBox'], width: '25%' } as React.CSSProperties
styleObj['attackBoxSquare'] = {
  ...styleObj['attackBox'],
  border: '1px solid Brown',
  borderRadius: '0px',
  backgroundColor: 'Pink',
  fontSize: '24px',
  paddingLeft: '25px',
  paddingRight: '25px',
} as React.CSSProperties

styleObj['inventoryBox'] = {
  fontSize: '18px',
} as React.CSSProperties

styleObj['inventoryBoxLong'] = {
  ...styleObj['inventoryBox'],
  width: '60%',
  paddingLeft: '5px',
} as React.CSSProperties

styleObj['inventoryBoxShort'] = {
  ...styleObj['inventoryBox'],
  width: '10%',
} as React.CSSProperties

styleObj['inventoryBoxMid'] = {
  ...styleObj['inventoryBox'],
  width: '30%',
} as React.CSSProperties

styleObj['inventoryEntry'] = {
  ...styleObj['HSpaced'],
  backgroundColor: 'white',
  borderColor: 'brown',
} as React.CSSProperties

styleObj['skillStat'] = {
  width: '50%',
} as React.CSSProperties

styleObj['squareTitleBox'] = {
  fontWeight: '900',
  fontSize: '25px',
  backgroundColor: 'LightGreen',
  border: '4px solid Green',
  height: ' 40px',
  width: '100%',
  textAlign: 'center',
} as React.CSSProperties

styleObj['squareTitleBoxBlue'] = {
  ...styleObj['squareTitleBox'],
  border: '4px solid Blue',
  backgroundColor: 'LightBlue',
} as React.CSSProperties

styleObj['topStatusBar'] = {
  display: 'flex',
  justifyContent: 'space-evenly',
  width: '100%',
  margin: '2px',
  backgroundColor: 'white',
} as React.CSSProperties

styleObj['baseText'] = { fontSize: '12px' } as React.CSSProperties
styleObj['gmText'] = { color: 'purple' } as React.CSSProperties
styleObj['playerText'] = { color: 'green' } as React.CSSProperties
styleObj['gameText'] = { color: 'blue', fontStyle: 'italic' } as React.CSSProperties
styleObj['alertText'] = { color: 'red', fontWeight: 'bold' } as React.CSSProperties
styleObj['loreText'] = { color: 'black', fontStyle: 'italic' } as React.CSSProperties
styleObj['loreClientText'] = {
  ...styleObj['loreText'],
  paddingBottom: '10px',
} as React.CSSProperties
styleObj['defaultText'] = {
  ...styleObj['baseText'],
  color: 'black',
  fontStyle: 'italic',
} as React.CSSProperties
styleObj['ParentDivWhite'] = {
  ...styleObj['ParentDiv'],
  backgroundColor: 'white',
} as React.CSSProperties

styleObj['Collapsible'] = {
  backgroundColor: 'lightGray',
  color: 'black',
  cursor: 'pointer',
  padding: '18px',
  width: '100%',
  border: 'none',
  textAlign: 'left',
  outline: 'none',
  fontSize: '15px',
} as React.CSSProperties

styleObj['TopFlexPage'] = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'stretch',
} as React.CSSProperties

styleObj['SectionButton'] = {
  backgroundColor: 'Indigo',
  color: 'white',
  cursor: 'pointer',
  border: 'none',
  height: '30px',
  width: '100%',
  textAlign: 'center',
  fontWeight: '900',
  alignItems: 'center',
  outline: 'none',
  fontSize: '18px',
} as React.CSSProperties

styleObj['imgStyleProp'] = {
  overflow: 'hidden',
  alignContent: 'center',
  height: '340px',
  width: '340px',
  touchAction: 'none',
} as React.CSSProperties

export default { styleObj }
