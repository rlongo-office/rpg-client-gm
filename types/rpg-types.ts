export const ADD_ACTOR: string = "ADD_ACTOR"
export const ADD_CREATURE: string = "ADD_CREATURE"
export const SET_CREATURE_ID: string = "SET_CREATURE_ID"

export interface AnyObject {
    [key: string]: any
  }
  
export interface AppProviderProps {
    children: React.ReactNode
  }
  
export interface location {
    player: string
    location: object //{x:number,y:number,z:number}
  }

export interface channel {
    name: string
    type:string //private, global, group
    target: string[]    //list of all recipients of the message

}

export interface messageBody {
    time: Date
    body: string
    sender: string
    recipient: string
}
  
export interface GameObject {
    globalTime: number
    players: location[]
    campaign: string
    channels: channel[]
  }
  
export interface messageType {
    id: number
    sender:string
    timeStamp:string
    type: string
    body: string
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
  img: string,
  imgTOP: number,
  imgLEFT: number,
  offsetY:number,
  offsetX:number,
  isFirstPress: boolean,
  isDragging: boolean,
  isScaling: boolean,
  divHeight: number,
  divWidth: number,
  topLimit: number,
  leftLimit: number,
  isLoaded: boolean,
  oldMouseX: number,
  oldMouseY: number,
  touchDist: number
}

export interface Coords{
  x?: number,
  y?: number
}

export interface ImageProps{
  source: string
}

export interface user{
  name: string,
  password:string
}