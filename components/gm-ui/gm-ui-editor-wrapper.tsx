import * as React from 'react'
import { styleObj } from '../../styles/styles'
import useViewport from '../../hooks/useViewport'
import { useAppContext } from '../../context/app-provider'
import GMUIObjEditor from './gm-ui-obj-editor'
function GMUIEditorWrapper() {
  const { game, players,items, spells, storylines, creatures } = useAppContext()
  const [objPath, setObjPath] = React.useState("")

  //Load the list for 1st, 2nd, and 3rd level object access for editing
  //Send array list to the selection drop downs
  //Add button to load and edit the object
  return (
      <div style={{ ...styleObj[`VStack`]}}>
        <div style={{ ...styleObj[`HStack`]}}></div>
        <GMUIObjEditor source={game} subObject={{}} />
      </div>

  )
}

export default GMUIEditorWrapper
