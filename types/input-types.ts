import * as PT from './player-types'

export interface Descriptor {
  [key: string]: DescriptorElem<any> | Descriptor
}

export type InputType = 'label' | 'text' | 'textarea' | 'number' | 'boolean' | 'list' | 'select' | 'object'

export interface DescriptorElem<T> {
  type: 'array' | 'object' | 'primitive'
  child?: Descriptor | DescriptorElem<T>
  input?: InputType
  dataType?: 'string' | 'number' | 'integer' | 'decimal' // Specify the data type (for numeric inputs)
  options?: string[] | number[] // Provide an array of options (for select inputs)
  keysOptions?: string[]
  min?: number // Specify the minimum value (for numeric inputs)
  max?: number // Specify the maximum value (for numeric inputs)
  step?: number // Specify the step value (for numeric inputs)
  keys?: (keyof T)[] // Use keyof T to represent the keys of the generic type T
}

const raceList = ['elf', 'human', 'dwarf', 'gnome', 'half-orc', 'halfing']

export const playerDescriptor: Descriptor = {
  _id: { type: 'primitive', input: 'text', min: 13, max: 13 },
  name: { type: 'primitive', input: 'text', min: 1, max: 50 },
  active: { type: 'primitive', input: 'boolean' },
  role: { type: 'primitive', input: 'text', min: 1, max: 50 },
  backStory: { type: 'primitive', input: 'textarea', min: 1, max: 250 },
  player: { type: 'primitive', input: 'text', min: 13, max: 13 },
  gender: { type: 'primitive', input: 'list', options: ['male', 'female'] },
  age: { type: 'primitive', input: 'number' },
  //fill with other descripterElem types
}

const weaponCatList = [
  'Simple Melee',
  'Melee',
  'Projectile',
  'Ammunition',
  'Two-Handed',
  'Thrown',
  'Finesse',
  'Light',
]
const weaponTypeList = [
  'acid',
  'bludgeoning',
  'cold',
  'fire',
  'force',
  'lightning',
  'necrotic',
  'piercing',
  'poison',
  'psychic',
  'radiant',
  'slashing',
  'and thunder',
]




export const weaponDescriptorElem: DescriptorElem<PT.Weapon> = {
  type: 'object',
  input: 'object',
  keys: Object.keys({} as PT.Weapon) as (keyof PT.Weapon)[],
  child: {
    name: { type: 'primitive', input: 'text', min: 1, max: 50 },
    category: { type: 'primitive', input: 'list', dataType: 'string', options: weaponCatList },
    type: { type: 'primitive', input: 'list', dataType: 'string', options: weaponTypeList },
    attack: { type: 'primitive', input: 'number', dataType: 'integer', min: -10, max: 10 },
    damage: { type: 'primitive', input: 'text', min: 1, max: 15 },
    proficient: { type: 'primitive', input: 'boolean' },
    range: {
      type: 'object',
      input: 'object',
      child: {
        normal: { type: 'primitive', input: 'number', dataType: 'integer', min: 1, max: 10000 },
        long: { type: 'primitive', input: 'number', dataType: 'integer', min: 1, max: 10000 },
      },
    },
    special: { type: 'primitive', input: 'text', min: 1, max: 50 },
  },
}

export const weaponArrayDescriptorElem: DescriptorElem<PT.Weapon> = {
  type: 'array',
  input: 'object',
  child: weaponDescriptorElem,
}


const spellTypes: string[] = []
const castTimes: string[] = []
const spellComponents: string[] = []
const spellSchools: string[] = []
const spellTraits: string[] = []

export const spellDescriptorElem: DescriptorElem<PT.Spell> = {
  type: 'object',
  input: 'object',
  keys: Object.keys({} as PT.Spell) as (keyof PT.Spell)[],
  child: {
    name: { type: 'primitive', input: 'text', min: 1, max: 50 },
    type: { type: 'primitive', input: 'select', dataType: 'string', options: spellTypes },
    level: { type: 'primitive', input: 'number', dataType: 'integer', min: 1, max: 50 },
    castTime: { type: 'primitive', input: 'select', dataType: 'string', options: castTimes },
    range: { type: 'primitive', input: 'number', dataType: 'integer', min: 1, max: 1000 },
    duration: { type: 'primitive', input: 'text', min: 1, max: 10 },
    dc: { type: 'primitive', input: 'text', min: 1, max: 50 },
    casterLevel: { type: 'primitive', input: 'number', dataType: 'integer', min: 1, max: 50 },
    castsLeft: { type: 'primitive', input: 'number', dataType: 'integer', min: 1, max: 50 },
    unlimited: { type: 'primitive', input: 'boolean' },
    description: { type: 'primitive', input: 'textarea', min: 1, max: 250 },
    components: {
      type: 'primitive',
      input: 'list',
      dataType: 'string',
      options: spellComponents,
    },
    schools: { type: 'primitive', input: 'list', dataType: 'string', options: spellSchools },
    traits: { type: 'primitive', input: 'list', dataType: 'string', options: spellTraits },
  },
}
