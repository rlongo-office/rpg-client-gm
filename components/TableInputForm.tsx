import * as React from 'react'
import {
  iterateObjEntries,
  getObjValue,
  setObjValue,
  createObjID,
  parseDataForTable,
} from './DataTable/TableBody/utils'
import { useAppContext } from '../context/AppProvider'
import { deepCopy } from './DataTable/TableBody/utils'

interface AnyObject {
  [key: string]: any
}

interface props {
  source: string
  target: string
}

function TableInputForm({ source, target }: props) {
  const { creatures, actors, setActors, tableConfig,reducer } = useAppContext()
  const[currentRecord,setCurrentRecord] = React.useState<AnyObject>()
  const [inputValues, setInputValues] = React.useState<object>({})
  const inputRefs = React.useRef<JSX.Element[]>([])

  const getRecord = (data:AnyObject[])=>{
    const selectedID = tableConfig[source].selected[0]
    const idPath = tableConfig[source].filtered[0]
    const filtered = (data.filter((row: AnyObject) => {
      const iDOfRecord = getObjValue(row, idPath, 0)
      return(iDOfRecord == selectedID)
      }))
    return filtered[0]
    }
    
  const createActor = () => {
    const record = getRecord(creatures)
    let actor: any = deepCopy(record)
    Object.entries(inputValues).forEach(([key, value]) => {
      setObjValue(actor, key, value)
    })
    reducer('addActor',actor)
    //const newActors = [...actors, createObjID(actors, actor)]
    //setActors(newActors)
    //setInputValues({})
  }

  const resetValues = () => {
    console.log(inputRefs)
  }

  const storeInput = (event: any) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      let inputUpdate: AnyObject = inputValues
      inputUpdate[event.target.id] = event.target.value
      setInputValues(inputUpdate)
    }
  }

  const renderInputForm = () => {
    if (tableConfig[source].selected.length > 0) {
      const record = getRecord(creatures)
      //setCurrentRecord(record)
      let content: JSX.Element[] = []
      let inputLabels: Array<string> = []
      iterateObjEntries('', record, inputLabels)

      inputLabels.forEach((path: string) => {
        let labelText = path.toUpperCase()
        let labelProps: Object = { className: 'InputLabel', key: `label-${path}` }
        let inputProps: Object = {
          id: `${path}`,
          key: `input-${path}`,
          placeholder: getObjValue(record, path, 'none'),
          onKeyPress: storeInput,
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
  }

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [tableConfig])

  return (
    <>
      <button onClick={createActor}>Create Actor</button>
      <button onClick={resetValues}>Reset values</button>
      <div className="InputPage inputStriped">{renderInputForm()}</div>
    </>
  )
}
//renderInputForm(creatures[tableConfig["creatureConfig"].selected[0]])}
export default TableInputForm
