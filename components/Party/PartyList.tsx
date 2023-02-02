import { useAppContext } from '@context/app-provider'
import * as React from 'react'

function PartyList() {
  const { game } = useAppContext()

  const loadPlayerStats = () => {}

  return (
    <div>
      {game &&
        game.players.map((player: any, index: number) => (
          <button key={index} onClick={loadPlayerStats}>
            {player.name}
          </button>
        ))}
    </div>
  )
}

export default PartyList
