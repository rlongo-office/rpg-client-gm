import { useRef, useEffect, useState, useCallback } from 'react'
import * as types from '../types/rpg-types'
import { useAppContext } from '@context/app-provider'

function PlayerContainer() {
  const {gameState} = useAppContext()
  const [selected,setSelected] = useState<string[]>([])
  const [players,setPlayers] = useState<string[]>([])

  useEffect(() => {
    setPlayers(gameState.players.map((p)=>p.name))
  }, [gameState])

  const handleMultiSelectChange = useCallback((selectedOptions: types.SelectionOption[]) => {
    const msgRecips = selectedOptions.map(option => option.value)
    setSelected(msgRecips)
  }, [])

  return (
    <>
    </>
  )
}

export default PlayerContainer
