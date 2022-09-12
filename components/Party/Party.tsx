import * as React from 'react'
import { useAppContext } from '../../context/app-provider'
import PartyList from './PartyList'
import PlayerStats from './PlayerStats'

function Party() {
  const { game } = useAppContext()

  return (
    <>
      <PartyList></PartyList>
      <PlayerStats></PlayerStats>
    </>
  )
}

export default Party
