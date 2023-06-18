import * as dataTypes from './data-types'

export const ADD_ACTOR: string = 'ADD_ACTOR'
export const ADD_CREATURE: string = 'ADD_CREATURE'
export const SET_CREATURE_ID: string = 'SET_CREATURE_ID'


export interface ListOption {
  label: string
  value: string
}

export interface Action {
  type: string
  payload: any
  path: string
}

export interface AnyObject {
  [key: string]: any
}

export interface AppProviderProps {
  children: React.ReactNode
}

export interface messageBody {
  time: Date
  data: string
  sender: string
  recipient: string
}

export interface GMState {
  creatures: ListOption[]
  actors: ListOption[]
  items: ListOption[]
}

export interface GameState {
  id:string
  game:GameObject
  players: {user:string, name:string, currentStats:dataTypes.Character | null }[]
  characters: dataTypes.Character[]
  textHistory:TextMessage[]
}


//Consider using BigInt wrapper for the WorldTime
export interface GameObject {
  _id: { $oid: string }
  id: string
  yearTime: number
  time: number //This the current time from the start of the current year, as milliseconds 31.536 x 10^9 per year
  actors: Actor[]
  campaign: string
  channels: Channel[] //e.g. gm, bob, michael, etc....
  climate: Climate[]
}

export interface GameObjectInputMap {
  id: dataTypes.StringInputConfig
  yearTime: dataTypes.NumberInputConfig
  time: dataTypes.NumberInputConfig
  players: dataTypes.DropdownInputConfig
  campaign: dataTypes.StringInputConfig
  channels: dataTypes.DropdownInputConfig
  climate: dataTypes.StringInputConfig
}

export interface Climate {
  location: Location
  radius: number  //probably in miles
  highTemp: number
  lowTemp: number
  windSpeed: number
  windDir: number //360 radial measure, 0=north, 90=East, etc
  humidity: number
  precip: number //as inch per hour
  visibility: number //in feet
  conditions: string[]
}

export interface Location {
  x: number,
  y: number,
  z: number
}

export interface Actor {
  name: string
  templateID: string //idea here is that this referred to a creature obj if this is an NPC, else obj to player doc
  stats: object //Could reference the actual document itself, whether player or NPC object
  location: Location
  condition: string[]
  desc: string[]
  relationships: ActorRelationship[]
}

interface ActorRelationship {
  _id: string //id to item, other actor, etc
  type: string //owner, father, wive, enemy, protector, etc...
  state: string //generally a description of emotion, intent, strength, etc of the relationship
}
export interface DataAccess {
  collections: string[] //those collections excluded
  rarity: string[] //those documents excluded by rarity level e.g. common, uncommon, rare, very rare, unique, etc.
  dataTags: string[] //those tags excluded, this could get large
  documents: string[] //list of documents excluded
  fields: FieldAccess[] //list of those fields excluded
}

export interface FieldAccess {
  collection: string
  id: string
  fields: { [key: string]: number }[] //number
}

const vampireAccess: FieldAccess = {
  collection: 'creatures',
  id: '61944916ea190d7e283c964a',
  fields: [
    { size: 5 },
    { specials: 5 }, //description array of string, but let's maken them an array of {desc:string, level: number}
  ],
} //so that you can only see those key values that match your value

const vampireExclusion: FieldAccess = {
  collection: 'creatures',
  id: '61944916ea190d7e283c964a',
  fields: [
    { desc: 2 }, //I am envisioning levels of access, from say 0 to 5, with 0 no access, and 5 is full access
  ],
} //so that you can only those string in description that match your value

const bobTheFarmer: FieldAccess = {
  collection: 'NPC',
  id: '61944916ea190d7e283c964a',
  fields: [
    { desc: 2 }, //description array of string, but let's maken them an array of {desc:string, level: number}
  ],
} //so that you can only those string in description that match your value

const JasonPermissions: DataAccess = {
  collections: [], //those collections excluded
  rarity: ['rare', 'very-rare', 'unique'], //those documents excluded by rarity level e.g. common, uncommon, rare, very rare, unique, etc.
  dataTags: ['dragon', 'abomination'], //those tags excluded, this could get large
  documents: [], //list of documents excluded
  fields: [vampireExclusion], //list of those fields excluded
}

export interface location {
  player: string
  coords: object //{x:number,y:number,z:number}
}

export interface Channel {
  name: string
  type: string //private, global, group
  target: string[] //list of all recipients of the message
}

export interface messageType {
  id: number
  sender: string
  timeStamp: string
  type: string
  data: string
  dest: string[]
}

export interface TextMessage {
  id: number
  type: string
  timeStamp: string
  sender: string
  text: string
  dest: string[]
}

export interface TableConfig {
  tableID: string
  sortColumns: Array<number>
  header: Array<string>
  stripe: boolean
  border: boolean
  pageSize: number
  current: number
  tableSpan: number
  lowerBound: number
  upperBound: number
  selected: Array<number>
  data: Array<AnyObject>
  filteredData: Array<AnyObject>
}

export interface ConfigObject {
  [key: string]: TableConfig
}

export type ImageConfigType = {
  img: string
  imgTOP: number
  imgLEFT: number
  offsetY: number
  offsetX: number
  isFirstPress: boolean
  isDragging: boolean
  isScaling: boolean
  divHeight: number
  divWidth: number
  topLimit: number
  leftLimit: number
  isLoaded: boolean
  oldMouseX: number
  oldMouseY: number
  touchDist: number
  accLimit: number
  scaleInc: number
}

export interface Coords {
  x?: number
  y?: number
}

export interface ImageProps {
  source: string
}

export interface StatSection {
  name: string
  title: string
  position: string
  width: number
  height: number
  style: string
  fields: Array<string>
  children: Array<StatSection>
}

export interface Field {
  label: string
  path: string
}

export interface InfoMap {
  'map-name': string
  'rules-set': string
  version: string
  top: Array<StatSection>
}

export interface SelectionOption {
  label: string
  value: string
}
