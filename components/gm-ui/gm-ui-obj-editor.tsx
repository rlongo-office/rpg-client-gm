import * as React from 'react'
import { iterateObjEntries, getObjValue, setObjValue, deepCopy } from '../../utils/utils'
import { useAppContext } from '../../context/app-provider'

interface AnyObject {
  [key: string]: any
}

interface props {
  source: object
  subObject:object
}

function GMUIObjEditor({ source, subObject }: props) {

  const [currentRecord, setCurrentRecord] = React.useState<AnyObject>()
  const [inputValues, setInputValues] = React.useState<object>({})
  const inputRefs = React.useRef<JSX.Element[]>([])


  const resetValues = () => {
    console.log(inputRefs)
  }

  const storeInput = (event: any) => {
    if (event.keyCode === 13) {
      event.preventDefault()
      let inputUpdate: AnyObject = inputValues
      inputUpdate[event.target.id] = event.target.value
      setInputValues(inputUpdate)
    }
  }

  const renderInputForm = () => {
      const record = source
      //setCurrentRecord(record)
      let content: JSX.Element[] = []
      let inputLabels: Array<string> = []
      iterateObjEntries('', record, inputLabels)

      inputLabels.forEach((path: string) => {
        let labelText = path.toUpperCase()
        let placeHolder = getObjValue(record, path, 'none')
        let labelProps: Object = { className: 'InputLabel', key: `label-${path}` }
        let inputProps: Object = {
          id: `${path}`,
          key: `input-${path}`,
          placeholder: placeHolder,
          onKeyDown: storeInput,
          type: 'text',
          ref: (e: JSX.Element) => inputRefs.current.push(e),
          autoFocus: true,
        }

        let labelEL = React.createElement('span', labelProps, labelText)
        content.push(labelEL)
        let inputEl = React.createElement('input', inputProps)
        content.push(inputEl)
      })
      return content

  }

  React.useEffect(() => {
    console.log(inputValues)
  },[inputValues])

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0)
    }
  },[])

  return (
    <>
      <div className="InputPage inputStriped">{renderInputForm()}</div>
    </>
  )
}

export default GMUIObjEditor
