export interface UISectionObj {
  child?: (UISectionObj | UIDataObj)[]
  clickable: boolean
  data: string
  id: string
  label: string
  message: string
  orient: string
  style: string
  type: string
}

export interface UIDataObj extends UISectionObj {
  index?: number
  source?: string
}

export interface UIDataKeyObj extends UIDataObj {
  index: number
  source: string
}
