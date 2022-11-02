import * as React from 'react'
import { styleObj } from '../../styles/styles'
import useViewport from '../../hooks/useViewport'
import { useAppContext } from '../../context/app-provider'
import GMUIObjEditor from './gm-ui-obj-editor'

function GameObjEditor() {
  const { devWidth, devHeight } = useViewport()
  const { game, setGame } = useAppContext()
  return (
      <div style={{ ...styleObj[`VStack`]}}>
        <GMUIObjEditor source={game} subObject={{}} />
      </div>

  )
}

export default GameObjEditor
