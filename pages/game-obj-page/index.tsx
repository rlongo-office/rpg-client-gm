import GameObjEditor from '@components/gm-ui/game-obj-editor'
import UiObjTreeEditor from '@components/gm-ui/ui-obj-tree-editor'
import UiTreeEditor from '@components/gm-ui/ui-tree-editor'
import { useAppContext } from '@context/app-provider'
import data from 'data/collections/players'
import * as React from 'react'

export type ObjType = {
  obj: object
}

function GameObjPage() {
  const { gmState } = useAppContext()

  return (
    <div>
      <UiObjTreeEditor source={`game`} />
      <UiTreeEditor name={'game'} obj={data[0]}/>
    </div>
  )
}

export default GameObjPage
