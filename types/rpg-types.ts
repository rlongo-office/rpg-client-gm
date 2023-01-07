export const ADD_ACTOR: string = 'ADD_ACTOR'
export const ADD_CREATURE: string = 'ADD_CREATURE'
export const SET_CREATURE_ID: string = 'SET_CREATURE_ID'

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

//Consider using BigInt wrapper for the WorldTime
export interface GameObject {
  id: string
  yearTime: number
  time: number      //This the current time from the start of the current year, as milliseconds 31.536 x 10^9 per year
  players: Actor[]
  campaign: string
  channels: channel[]  //e.g. gm, bob, michael, etc....
  climate: Climate[]
}

export interface Climate {
  coords: { x: number; y: number; z: number }
  highTemp: number
  lowTemp: number
  windSpeed: number
  windDir: number //360 radial measure, 0=north, 90=East, etc
  humidity: number
  precip: number //as inch per hour
  visibility: number //in feet
  conditions: string[]
}

export interface Actor {
  name: string
  stats: object
  location: { x: number; y: number; z: number }
  condition: string[]
}
export interface location {
  player: string
  coords: object //{x:number,y:number,z:number}
}

export interface channel {
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

export interface textMessage {
  id: number
  type:string
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

export interface ImageConfig {
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
  name:string,
  title:string,
  position:string,
  width:number,
  height:number,
  style:string,
  fields:Array<string>,
  children:Array<StatSection>
}

export interface Field {
  label:string,
  path: string
}

export interface InfoMap {
  "map-name": string,
  "rules-set": string,
  "version": string,
  "top": Array<StatSection>
}
  