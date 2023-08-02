import * as React from 'react'
import {
  iterateObjEntries,
  getObjValue,
  setObjValue,
  deepCopy,
  getNodeType,
} from '../../utils/utils'
import UiObjTreeNode from './ui-obj-tree-node'
import useObjReducer from '../../hooks/use-obj-reducer'
import data from 'data/collections/players'

interface AnyObject {
  [key: string]: any
}

interface props {
  source: string
}

function UiObjTreeEditor({ source }: props) {
  const { objReducer } = useObjReducer()
  const [clonedObj, setClonedObj] = React.useState<any>({})

  const storeInput = (value: any, path: string) => {
    //called from child, changes value in current cloned copy of source object
    let tempObj: object = clonedObj
    setObjValue(tempObj, path, value)
    setClonedObj(tempObj)
    console.log(tempObj)
  }

  const loadSource = () => {
    return objReducer(source, {}, 'return-object', '')
  }

  React.useEffect(() => {
    const sourceObj = loadSource()
    setClonedObj(sourceObj)
  }, [])

/*   React.useEffect(() => {
    const sourceObj = loadSource()
    setClonedObj(sourceObj)
  }, []) */

  return (
    <>
      <UiObjTreeNode
        label={source}
        subSource={data}
        path={``}
        callRootEdit={storeInput}
        nodeType={getNodeType(clonedObj)}
        level={0}
      />
    </>
  )
}

export default UiObjTreeEditor
