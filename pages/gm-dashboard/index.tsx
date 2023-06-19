import * as React from 'react'
import { useAppContext } from '@context/app-provider'
import MultiSelect, { Option } from '@components/UI/MultiSelect'
import { useAppEventContext } from '@context/app-event-provider'
import { useCallback, useEffect, useState } from 'react'
import * as rpgTypes from 'types/rpg-types'

function GMDashboard() {
  const { gmState} = useAppContext()
  const { addToOutboundQueue } = useAppEventContext()
  const [creaturesList,setCreatuesList] = useState<Option[]>()
  const [pageClick,setPageClick] = useState<boolean>(false)
  

  useEffect(() => {
    const msg = {
      id: 0.1,
      sender: 'GM',
      timeStamp: '',
      type: 'collectionList',
      data: JSON.stringify({ collection: 'creatures', projection: { _id: 1, name: 1 } }),
      dest: ['server'],
    }
    addToOutboundQueue(JSON.stringify(msg))
  }, [])

  useEffect(() => {
    setCreatuesList(gmState.creatures)
  }, [gmState.creatures])


  const handleMultiSelectChange = useCallback((selectedOptions: rpgTypes.SelectionOption[]) => {
    const selectedIDs:string[] = selectedOptions.map(o=>o.value) 
    console.log(`Here are your selected options: ${selectedIDs}`)
  }, [])
  
    function handlePageClick(event: React.MouseEvent<HTMLDivElement>): void {
        setPageClick((prevState) => !prevState);
    }

  return (
    <>
      <div  onClick={handlePageClick}>
        <MultiSelect
          options={creaturesList}
          onChange={handleMultiSelectChange}
          fontSize={''}
          grow={false}
          parentClick={pageClick}
        ></MultiSelect>
      </div>
    </>
  )
}

export default GMDashboard
