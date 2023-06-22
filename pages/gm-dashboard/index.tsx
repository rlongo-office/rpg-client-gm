import * as React from 'react'
import { useAppContext } from '@context/app-provider'
import MultiSelect, { Option } from '@components/UI/MultiSelect'
import { useAppEventContext } from '@context/app-event-provider'
import { useCallback, useEffect, useRef, useState } from 'react'
import * as rpgTypes from 'types/rpg-types'

function GMDashboard() {
  const { gmState } = useAppContext()
  const { addToOutboundQueue } = useAppEventContext()
  const [creaturesList, setCreatuesList] = useState<Option[]>()
  const [itemsList, setItemsList] = useState<Option[]>()
  const [pageClick, setPageClick] = useState<boolean>(false)
  const pageClickRef = useRef<boolean>(false)
  const multiSelectRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      console.log('handleDocumentClick was fired')
      const clickedElement = event.target as HTMLDivElement
      console.log('Clicked element id:', clickedElement.id)
      console.log('multiSelectRef.current:', multiSelectRef.current)
      //if (multiSelectRef.current && !multiSelectRef.current.contains(event.target as Node)) {
      if (multiSelectRef.current && clickedElement.id ==="topPageDiv" ) {
        console.log(`page was clicked outside of MultiSelect`)
        setPageClick(prevState => !prevState)
        pageClickRef.current = !pageClickRef.current // Toggle between true and false
      }
    }

    document.addEventListener('click', handleDocumentClick)

    return () => {
      document.removeEventListener('click', handleDocumentClick)
    }
  }, [])

  useEffect(() => {
/*     const msg = {
      id: 0.1,
      sender: 'GM',
      timeStamp: '',
      type: 'collectionList',
      data: JSON.stringify({ collection: 'creatures', projection: { _id: 1, name: 1 } }),
      dest: ['server'],
    }
    addToOutboundQueue(JSON.stringify(msg)) */
  }, [])

  useEffect(() => {
    setCreatuesList(gmState.creatures)
  }, [gmState.creatures])

  useEffect(() => {
    setItemsList(gmState.items)
  }, [gmState.items])

  const handleMultiSelectChange = useCallback((selectedOptions: rpgTypes.SelectionOption[]) => {
    const selectedIDs: string[] = selectedOptions.map(o => o.value)
    console.log(`Here are your selected CREATURES options: ${selectedIDs}`)
  }, [])

  const handleMultiSelectChangeTest = useCallback((selectedOptions: rpgTypes.SelectionOption[]) => {
    const selectedIDs: string[] = selectedOptions.map(o => o.value)
    console.log(`Here are your selected ITEMS options: ${selectedIDs}`)
  }, [])

  const handlePageClick = (event: React.MouseEvent<HTMLDivElement>) => {
    console.log('handlePageClick was fired')
    if (!event.currentTarget.contains(event.target as Node)) {
      console.log(`page was clicked outside of MultiSelect`)
      pageClickRef.current = !pageClickRef.current // Toggle between true and false
    }
  }

  return (
    <>
      <div id="topPageDiv" ref={multiSelectRef}>
        <div style={{ width: '400px' }}>
          <MultiSelect
            options={creaturesList}
            onChange={handleMultiSelectChange}
            fontSize={''}
            grow={false}
            parentClick={pageClick}
          ></MultiSelect>
        </div>
        <div style={{ width: '400px' }}>
          <MultiSelect
            options={itemsList}
            onChange={handleMultiSelectChangeTest}
            fontSize={''}
            grow={false}
            parentClick={pageClick}
          ></MultiSelect>
        </div>
      </div>
    </>
  )
}

export default GMDashboard
