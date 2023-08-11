import GameObjEditor from '@components/gm-ui/game-obj-editor'
import UiObjTreeEditor from '@components/gm-ui/ui-obj-tree-editor'
import UiTreeEditor from '@components/gm-ui/ui-tree-editor'
import { useAppContext } from '@context/app-provider'
import data from 'data/collections/players'
import * as React from 'react'
import SimpleDropdownList from '@components/UI/simple-dropdown-list'
import { GenericStat, Weapon } from '@apptypes/player-types'
import GenericStatInput from '@components/gm-ui/input/generic-stat-input'
import GenericObjInput from '@components/gm-ui/input/generic-obj-input'
import { DescriptorElem, weaponDescriptorElem } from '@apptypes/input-types'

export type ObjType = {
  obj: object
}

const raceList = ['elf', 'human', 'dwarf', 'gnome', 'half-orc', 'halfing']

const initialSource: GenericStat = {
  apple: 2.3,
  pear: 3.1,
  banana: 1.5,
}

const descriptor: DescriptorElem<GenericStat> = {
  type: 'object',
  input: 'number',
  dataType: 'decimal',
  keysOptions: ['apple', 'pear', 'banana', 'melon', 'peach', 'guava'],
  keys: Object.keys(initialSource) as (keyof GenericStat)[],
  min: 0,
  max: 1,
  step: 0.05,
}

const weaponSource: Weapon = {
  name: 'Sling',
  category: ['Projectile'],
  type: ['Bludgeoning'],
  attack: 4,
  damage: '1',
  proficient: true,
  range: {
    normal: 30,
    long: 120,
  },
  special: '',
}

function GameObjPage() {
  const { gmState } = useAppContext()
  const source: GenericStat = { apple: 2.3, pear: 3.1, banana: 1.5 }

  const handleUpdate = (updatedObject: Weapon) => {
    console.log(JSON.stringify(updatedObject))
  }

  return (
    <div>
      <UiTreeEditor name={'game'} obj={data[0]} />
      {/* <GenericStatInput source={source} descriptor={descriptor} onChange={handleUpdate} /> */}
      <div style={{width:`300px`}}>
        <GenericObjInput
          source={weaponSource}
          descriptor={weaponDescriptorElem}
          onChange={handleUpdate}
        />
      </div>
    </div>
  )
}

export default GameObjPage
