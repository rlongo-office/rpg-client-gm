import * as React from 'react'
import ImageWrapper from '../../components/Image/image-wrapper'
import { styleObj } from '../../styles/styles'
import GameObjEditor from '../../components/gm-ui/game-obj-editor'
import { useAppContext } from '@context/app-provider'
import UiObjTreeEditor from '@components/gm-ui/ui-obj-tree-editor'
import MappedGameObjectEditor from '@components/gm-ui/mapped-obj-editor'
import MultiSelect, { Option } from '@components/UI/MultiSelect'
import { useAppEventContext } from '@context/app-event-provider'
import { useEffect } from 'react'

function GMDashboard() {
  const { creaturesList } = useAppContext()
  const { addToOutboundQueue } = useAppEventContext()

  useEffect(() => {
    const msg = {
      id: 0.1,
      sender: 'gm',
      timeStamp: '',
      type: 'collectionList',
      data: JSON.stringify({ collection: 'creatures', projection: { _id: 1, name: 1 } }),
      dest: ['server'],
    }

    addToOutboundQueue(JSON.stringify(msg))
  }, [])

  return (
    <>
      <div>
        <MultiSelect
          options={[]}
          onChange={function (selectedOptions: Option[]): void {
            throw new Error('Function not implemented.')
          }}
          fontSize={''}
          grow={false}
        ></MultiSelect>
      </div>
    </>
  )
}

export default GMDashboard
