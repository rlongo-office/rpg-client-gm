export interface UISectionObj {
  style: string
  type: string
  id: string
  clickable: boolean
  message: string
  label: string
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
}
