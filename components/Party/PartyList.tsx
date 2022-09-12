import * as React from 'react'
import { useAppContext } from '../../context/app-provider'

function PartyList() {
  const { game } = useAppContext()

  const loadPlayerStats = () => {}

  React.useEffect(() => {
    console.log(game)
  }, [game])

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
