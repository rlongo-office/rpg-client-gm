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
  const { creatures, actors, setActors, tableConfig } = useAppContext()
  const [inputValues, setInputValues] = React.useState<object>({})

  const createActor = () => {
    let actor: any = deepCopy(source)
    Object.entries(inputValues).forEach(([key, value]) => {
      setObjValue(actor, key, value)
    })

    const newActors = [...actors, createObjID(actors, actor)]
    setActors(parseDataForTable(newActors, ['name', 'type', 'hit_dice', 'challenge_rating']))
    setInputValues({})
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
      const record = creatures[tableConfig[source].selected[0]]

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

  return (
    <>
      <button onClick={createActor}>Create Actor</button>
      <div className="InputPage inputStriped">
        {renderInputForm()}
      </div>
    </>
  )
}
//renderInputForm(creatures[tableConfig["creatureConfig"].selected[0]])}
export default TableInputForm
