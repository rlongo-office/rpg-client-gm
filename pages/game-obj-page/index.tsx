import GameObjEditor from '@components/gm-ui/game-obj-editor'
import UiObjTreeEditor from '@components/gm-ui/ui-obj-tree-editor'
import UITreeEditorDescriptor from '@components/gm-ui/ui-tree-editor-descriptor'
import { useAppContext } from '@context/app-provider'
import data from 'data/collections/players'
import * as React from 'react'
import SimpleDropdownList from '@components/UI/simple-dropdown-list'
import { GenericStat, Weapon,Character } from '@apptypes/player-types'
import { DescriptorElem, weaponDescriptorElem,characterDescriptorElem} from '@apptypes/input-types'
import WithModalWrapper from '@components/UI/modal-wrapper'
import { createBlankObjectFromDescriptor } from '@utils/utils'

export type ObjType = {
  obj: object
}

const raceList = ['elf', 'human', 'dwarf', 'gnome', 'half-orc', 'halfing']

const weaponArray:Weapon[] = [
  {
    "name": "Dagger",
    "category": ["Melee", "Thrown"],
    "type": ["Piercing"],
    "attack": 4,
    "damage": "1d4+2",
    "proficient": true,
    "range": {
      "normal": 20,
      "long": 60
    },
    "special": ""
  },
  {
    "name": "Quarterstaff",
    "category": ["Melee"],
    "type": ["Bludgeoning"],
    "attack": 2,
    "damage": "1d6",
    "proficient": true,
    "range": {
      "normal": 0,
      "long": 0
    },
    "special": ""
  },
  {
    "name": "Unarmed strike",
    "category": ["Melee"],
    "type": ["Bludgeoning"],
    "attack": 2,
    "damage": "1",
    "proficient": true,
    "range": {
      "normal": 0,
      "long": 0
    },
    "special": ""
  },
  {
    "name": "Sling",
    "category": ["Projectile"],
    "type": ["Bludgeoning"],
    "attack": 4,
    "damage": "1",
    "proficient": true,
    "range": {
      "normal": 30,
      "long": 120
    },
    "special": ""
  }
]

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
  const { gmState } = useAppContext();

  const handleUpdate = (updatedObject: any) => {
    console.log(`Parent received: ${JSON.stringify(updatedObject)}`);
  }

  return (
    <div>
      <UITreeEditorDescriptor name={'player'} obj={data[0]} descriptor={characterDescriptorElem} />
    </div>
  );
}

export default GameObjPage;
