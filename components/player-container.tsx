import * as React from 'react'
import playerData from '../data/collections/players.json'
import Map from '../data/collections/maps/player-main.-stats-test.json'
import Section from './section'
import { StatSection, InfoMap } from '../types/rpg-types'
//This is a no-no so we need a type of Creature. So refactor this with a Creature type
interface AnyObject {
  [key: string]: any
}

interface Props {
  map: InfoMap
  data: object
}

function PlayerContainer({ map, data }: Props) {
  const [playerStats, setPlayerStats] = React.useState<AnyObject>(playerData[0])
  const [statMap, setStatMap] = React.useState<AnyObject>(Map)

  React.useEffect(() => {}, [])
  return (
    <>
      {statMap.top.sections.map((row: any, rowIndex: number) => (
        <Section key={rowIndex} section={row} record={playerStats} />
      ))}
    </>
  )
}

export default PlayerContainer
