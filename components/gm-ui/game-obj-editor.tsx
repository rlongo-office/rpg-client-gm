import * as React from 'react'
import { styleObj } from '../../styles/styles'
import useViewport from '../../hooks/useViewport'
import { useAppContext } from '../../context/app-provider'
import GMUIObjEditor from './gm-ui-obj-editor'


function GameObjEditor(obj:object) {
  const { devWidth, devHeight } = useViewport()
  return (
      <div style={{ ...styleObj[`HSTACK`]}}>
        <GMUIObjEditor source={obj} subObject={{}} />
      </div>

  )
}

export default GameObjEditor
