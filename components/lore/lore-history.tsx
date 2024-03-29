import * as React from 'react'
import { useAppContext } from '../../context/app-provider'
import LoreEntry from './lore-entry'
/* import styled from '@emotion/styled'

const StyledDiv = styled.div`
  border-color: blue;
  overflow-y: auto;
  height: 200px;
  width: 370px;
` */

function LoreHistory() {
  const { loreMsgData } = useAppContext()
  return (
    <div style={{ borderColor: 'blue', overflowY: 'auto', height: '200px', width: '370px' }}>
      {loreMsgData.map((row: any, rowIndex: number) => (
        <div id={`row-id-${rowIndex}`} key={`row-key-${rowIndex}`}>
          <LoreEntry {...row} />
        </div>
      ))}
    </div>
  )
}

export default LoreHistory
