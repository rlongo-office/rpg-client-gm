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
  
export interface GameObject {
    globalTime: number
    players: location[]
    campaign: string
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