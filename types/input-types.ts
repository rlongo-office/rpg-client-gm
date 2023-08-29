import * as PT from './player-types'

export interface Descriptor {
  [key: string]: DescriptorElem<any> | Descriptor
}

export type InputType =
  | 'label'
  | 'text'
  | 'textarea'
  | 'number'
  | 'boolean'
  | 'list'
  | 'select'
  | 'object'
  | 'generic-object'

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
const alignment = [
  'Lawful Good',
  'Neutral Good',
  'Chaotic Good',
  'Lawful Neutral',
  'Chaotic Neutral',
  'True Neutral',
  'Lawful Evil',
  'Neutral Evil',
  'Chaotic Evil',
  'Lawful Evil',
  'Neutral Evil',
  'Chaotic Evil',
  'Nuetral Evil',
]
const hair = ['Black', 'Brown', 'Blonde', 'Red', 'White', 'Grey', 'dirty blonde', 'Bald']
const eyes = ['Blue', 'Brown', 'Green', 'Hazel', 'Grey', 'Black']
const skin = ['Black', 'Brown', 'White', 'Tan', 'Olive', 'Pale']
const deity = [
  'Auril',
  'Azuth',
  'Bane',
  'Beshaba',
  'Bhaal',
  'Chauntea',
  'Cyric',
  'Deneir',
  'Eldath',
  'Gond',
  'Helm',
  'Ilmater',
  'Kelemvor',
  'Lathander',
  'Leira',
  'Lliira',
  'Loviatar',
  'Malar',
  'Mask',
  'Mielikki',
  'Milil',
  'Myrkul',
  'Mystra',
  'Oghma',
  'Red Knight',
  'Savras',
  'Selune',
  'Shar',
  'Silvanus',
  'Sune',
  'Talona',
  'Talos',
  'Tempus',
  'Torm',
  'Tymora',
  'Tyr',
  'Umberlee',
  'Waukeen',
]
const senses = ['Blindsight', 'Darkvision', 'Tremorsense', 'Truesight']
const auras = [
  'Aura of Courage',
  'Aura of Protection',
  'Aura of Devotion',
  'Aura of Warding',
  'Aura of Hate',
  'Aura of Life',
  'Aura of Purity',
  'Aura of Courage',
  'Aura of Protection',
  'Aura of Devotion',
  'Aura of Warding',
  'Aura of Hate',
  'Aura of Life',
  'Aura of Purity',
]
const languages = [
  'Common',
  'Dwarvish',
  'Elvish',
  'Giant',
  'Gnomish',
  'Goblin',
  'Halfling',
  'Orc',
  'Abyssal',
  'Celestial',
  'Draconic',
  'Deep Speech',
  'Infernal',
  'Primordial',
  'Sylvan',
  'Undercommon',
]
const toolProfs = [
  'Alchemist’s supplies',
  'Brewer’s supplies',
  'Calligrapher’s supplies',
  'Carpenter’s tools',
  'Cartographer’s tools',
  'Cobbler’s tools',
  'Cook’s utensils',
  'Glassblower’s tools',
  'Jeweler’s tools',
  'Leatherworker’s tools',
  'Mason’s tools',
  'Painter’s supplies',
  'Potter’s tools',
  'Smith’s tools',
  'Tinker’s tools',
  'Weaver’s tools',
  'Woodcarver’s tools',
  'Disguise kit',
  'Forgery kit',
  'Dice set',
  'Dragonchess set',
  'Playing card set',
  'Three-Dragon Ante set',
  'Herbalism kit',
  'Bagpipes',
  'Drum',
  'Dulcimer',
  'Flute',
  'Lute',
  'Lyre',
  'Horn',
  'Pan flute',
  'Shawm',
  'Viol',
]
const classes = [
  'Barbarian',
  'Bard',
  'Cleric',
  'Druid',
  'Fighter',
  'Monk',
  'Paladin',
  'Ranger',
  'Rogue',
  'Sorcerer',
  'Warlock',
  'Wizard',
]
const classSpells = [
  'Bard',
  'Cleric',
  'Druid',
  'Paladin',
  'Ranger',
  'Sorcerer',
  'Warlock',
  'Wizard',
]
const castSource = ['Arcane', 'Divine', 'Natural', 'Psionic']
const abilities = ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma']
const weaponProfs = [
  'Simple Melee',
  'Melee',
  'Projectile',
  'Ammunition',
  'Two-Handed',
  'Thrown',
  'Finesse',
  'Light',
]
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
const armorProfs = ['Light', 'Medium', 'Heavy', 'Shield']
const skills = [
  'agility',
  'athletics',
  'awareness',
  'deception',
  'insight',
  'intimidation',
  'perception',
  'performance',
  'persuasion',
  'sleight of hand',
  'stealth',
  'survival',
]

export const raceDescriptorElem: DescriptorElem<PT.GenericStat> = {
  type: 'object',
  input: 'generic-object',
  dataType: 'number',
  keysOptions: raceList,
}

export const sensesDescriptorElem: DescriptorElem<PT.GenericStat> = {
  type: 'object',
  input: 'generic-object',
  dataType: 'number',
  keysOptions: raceList,
}

export const languagesDescriptorElem: DescriptorElem<PT.GenericStat> = {
  type: 'object',
  input: 'generic-object',
  dataType: 'number',
  keysOptions: languages,
}

export const purseDescriptorElem: DescriptorElem<PT.Purse> = {
  type: 'object',
  input: 'object',
  child: {
    platinum: { type: 'primitive', input: 'number', dataType: 'integer', min: 0, max: 100000000 },
    gold: { type: 'primitive', input: 'number', dataType: 'integer', min: 0, max: 100000000 },
    electrum: { type: 'primitive', input: 'number', dataType: 'integer', min: 0, max: 100000000 },
    silver: { type: 'primitive', input: 'number', dataType: 'integer', min: 0, max: 100000000 },
    copper: { type: 'primitive', input: 'number', dataType: 'integer', min: 0, max: 100000000 },
  },
  keys: Object.keys({} as PT.Purse) as (keyof PT.Purse)[],
}

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

const defenseCatList: string[] = []
const defenseTypeList: string[] = []

export const defenseDescriptorElem: DescriptorElem<PT.Defense> = {
  type: 'object',
  input: 'object',
  keys: Object.keys({} as PT.Defense) as (keyof PT.Defense)[],
  child: {
    name: { type: 'primitive', input: 'text', min: 1, max: 50 },
    category: { type: 'primitive', input: 'list', dataType: 'string', options: defenseCatList },
    type: { type: 'primitive', input: 'list', dataType: 'string', options: defenseTypeList },
    ac: { type: 'primitive', input: 'number', dataType: 'integer', min: 0, max: 30 },
    damage: { type: 'primitive', input: 'text' },
    proficient: { type: 'primitive', input: 'boolean' },
    special: { type: 'primitive', input: 'text', min: 1, max: 50 },
  },
}

export const classDescriptorElem: DescriptorElem<PT.Class> = {
  type: 'object',
  input: 'object',
  keys: Object.keys({} as PT.Class) as (keyof PT.Class)[],
  child: {
    level: { type: 'primitive', input: 'select', dataType: 'number', min: 1, max: 50 },
    name: { type: 'primitive', input: 'select', dataType: 'string', options: classes },
    spells: { type: 'primitive', input: 'select', dataType: 'string', options: classSpells },
    castLevel: { type: 'primitive', input: 'select', dataType: 'number', min: 1, max: 50 },
    spellAttack: { type: 'primitive', input: 'select', dataType: 'number', min: -10, max: 50 },
    spellSave: { type: 'primitive', input: 'select', dataType: 'number', min: -10, max: 50 },
    castSource: { type: 'primitive', input: 'select', options: castSource },
    spellAbility: { type: 'primitive', input: 'select', options: abilities },
    classHitDice: { type: 'primitive', input: 'text', min: 3, max: 20 },
  },
}
export const classArrayDescriptorElem: DescriptorElem<PT.Class> = {
  type: 'array',
  input: 'object',
  child: classDescriptorElem,
}

export const skillDescriptorElem: DescriptorElem<PT.Skill> = {
  type: 'object',
  input: 'object',
  keys: Object.keys({} as PT.Skill) as (keyof PT.Skill)[],
  child: {
    name: { type: 'primitive', input: 'select', dataType: 'string', options: skills },
    stat: { type: 'primitive', input: 'select', dataType: 'number', min: -10, max: 50 },
    passive: { type: 'primitive', input: 'select', dataType: 'number', min: -10, max: 50 },
    description: { type: 'primitive', input: 'textarea', min: 1, max: 250 },
  },
}
export const skillArrayDescriptorElem: DescriptorElem<PT.Skill> = {
  type: 'array',
  input: 'object',
  child: skillDescriptorElem,
}

const spellTypes = ['spell', 'cantrip']
const castTimes = [
  '1 action',
  '1 bonus action',
  '1 reaction',
  '1 minute',
  '10 minutes',
  '1 hour',
  '8 hours',
  '12 hours',
  '24 hours',
]
const spellComponents = ['V', 'S', 'M']
const spellSchools = [
  'Evocation',
  'Abjuration',
  'Conjuration',
  'Divination',
  'Enchantment',
  'Illusion',
  'Necromancy',
  'Transmutation',
]
const spellTraits = [
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
]

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

export const characterDescriptor: Descriptor = {
  _id: { type: 'primitive', input: 'text', min: 13, max: 13 },
  name: { type: 'primitive', input: 'text', min: 1, max: 50 },
  active: { type: 'primitive', input: 'boolean' },
  role: { type: 'primitive', input: 'text', min: 1, max: 50 },
  backStory: { type: 'primitive', input: 'textarea', min: 1, max: 250 },
  player: { type: 'primitive', input: 'text', min: 13, max: 13 },
  gender: { type: 'primitive', input: 'select', options: ['male', 'female', 'special'] },
  age: { type: 'primitive', input: 'number' },
  race: raceDescriptorElem,
  alignment: { type: 'primitive', input: 'select', options: alignment },
  hair: { type: 'primitive', input: 'text', options: hair },
  eyes: { type: 'primitive', input: 'text', options: eyes },
  skin: { type: 'primitive', input: 'text', options: skin },
  height: { type: 'primitive', input: 'number', min: 0.1, max: 6000 },
  weight: { type: 'primitive', input: 'number', min: 0.001, max: 330000000 },
  size: {
    type: 'primitive',
    input: 'list',
    options: ['tiny', 'small', 'medium', 'large', 'huge', 'gargantuan'],
  },
  reach: { type: 'primitive', input: 'number', min: 13, max: 13 },
  hitpoint: { type: 'primitive', input: 'number', min: -100, max: 100000 },
  damage: { type: 'primitive', input: 'number', min: -100, max: 100000 },
  deity: { type: 'primitive', input: 'list', options: deity },
  experience: { type: 'primitive', input: 'number', min: 0, max: 1000000000 },
  class: classArrayDescriptorElem,
  senses: sensesDescriptorElem,
  auras: { type: 'primitive', input: 'list', options: auras },
  purse: purseDescriptorElem,
  languages: languagesDescriptorElem,
  toolProfs: { type: 'primitive', input: 'list', options: toolProfs },
  weaponProfs: { type: 'primitive', input: 'list', options: weaponProfs },
  armorProfs: { type: 'primitive', input: 'list', options: armorProfs },
  abilities: {
    type: 'primitive',
    input: 'generic-object',
    dataType: 'number',
    keysOptions: abilities,
    min: 1,
    max: 50,
  },
  abilityMods: {
    type: 'primitive',
    input: 'generic-object',
    dataType: 'number',
    keysOptions: abilities,
    min: -10,
    max: 20,
  },
  skills: skillArrayDescriptorElem,
  allSaves: {
    type: 'primitive',
    input: 'generic-object',
    dataType: 'number',
    keysOptions: abilities,
    min: 1,
    max: 50,
  }
  //fill with other descripterElem types
}
