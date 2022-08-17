export interface UISectionObj {
  style: string
  type: string
  id: string
  clickable: boolean
  message: string
  label: string
  data: string
  orient: string
  child: (UISectionObj | UIDataObj)[]
}

export interface UIDataObj {
  style: string
  type: string
  id: string
  clickable: boolean
  message: string
  label: string
  data: string
  orient: string
  index?: number
  source?: string
  child?: (UISectionObj | UIDataObj)[]
}

export interface UIDataKeyObj extends UIDataObj {
  index: number
  source: string
}
