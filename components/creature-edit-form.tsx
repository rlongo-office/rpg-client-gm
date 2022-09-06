import * as React from 'react'
import DataSection from './data-section'
import { useAppContext } from '../context/app-provider'

interface AnyObject {
  [key: string]: any
}

interface props {
  source: string
  target: string
}

function CreatureEditForm({ source, target }: props) {
  const { creatures, actors, setActors, tableConfig, reducer } = useAppContext()
  const [currentCreature, setCurrentCreature] = React.useState<AnyObject>(creatures[source])
  //Add child components to format page each receiving the necessary data for rendering
  //
  React.useEffect(() => {}, [])

  return (
    <>
      <h1>This is the Creature Edit Form</h1>
      <DataSection record={currentCreature} />
    </>
  )
}

export default CreatureEditForm
