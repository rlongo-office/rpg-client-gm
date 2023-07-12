import * as React from 'react'
import { useAppContext } from '@context/app-provider'
//import MultiSelect, { Option } from '@components/UI/MultiSelect'
import MultiSelect2, { Option } from '@components/UI/MultiSelect'
import { useAppEventContext } from '@context/app-event-provider'
import { useCallback, useEffect, useRef, useState } from 'react'
import { styleObj } from '../../styles/styles'
import * as rpgTypes from 'types/rpg-types'
import GMLeftMenu from '@components/gm-ui/gm-left-menu'

function GMDashboard() {
  const { gmState } = useAppContext()
  const { addToOutboundQueue } = useAppEventContext()
  const [creaturesList, setCreatuesList] = useState<Option[]>()
  const [itemsList, setItemsList] = useState<Option[]>()
  const [pageClick, setPageClick] = useState<boolean>(false)
  const pageClickRef = useRef<boolean>(false)
  const multiSelectRef = useRef<HTMLDivElement>(null)

  useEffect(() => {}, [])

  return (
    <>
      <div id="topGMPage" style={{ height: '50px' }}>BunBoyBonanza</div>
      <div id="topDashboardDiv" style={styleObj[`TopGMPage`]} ref={multiSelectRef}>
        <div id="pageColOne" style={{ width: '10%' }}>
          <GMLeftMenu/>
        </div>
        <div id="pageColTwo" style={{ width: '30%' }}>
          Col 2
        </div>
        <div id="pageColThree" style={{ width: '30%' }}>
          Col 3
        </div>
        <div id="pageColThree" style={{ width: '30%' }}>
          Col 3
        </div>
      </div>
    </>
  )
}

export default GMDashboard

/* 

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


        <div style={{ width: '400px' }}>
          <MultiSelect2
            options={creaturesList}
            onChange={handleMultiSelectChange}
            fontSize={''}
            grow={true}
            parentClick={pageClick}
          ></MultiSelect2>
        </div>
        <div style={{ width: '400px' }}>
          <MultiSelect2
            options={itemsList}
            onChange={handleMultiSelectChangeTest}
            fontSize={''}
            grow={true}
            parentClick={pageClick}
          ></MultiSelect2>
        </div>
*/
