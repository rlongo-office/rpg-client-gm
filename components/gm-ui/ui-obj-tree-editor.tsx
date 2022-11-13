import * as React from 'react'
import {
  iterateObjEntries,
  getObjValue,
  setObjValue,
  deepCopy,
  getNodeType,
} from '../../utils/utils'
import UiObjTreeNode from './ui-obj-tree-node'

interface AnyObject {
  [key: string]: any
}

interface props {
  source: object
}

function UiObjTreeEditor({ source }: props) {
  const [clonedObj, setClonedObj] = React.useState<object>({})

  const storeInput = (value: any, path: string) => {
    //called from child, changes value in current cloned copy of source object
    let tempObj: object = clonedObj
    setObjValue(tempObj, path, value)
    setClonedObj(tempObj)
    console.log(tempObj)
  }

  React.useEffect(() => {
    //make a deep copy clone so we dont mess with original
    setClonedObj(deepCopy(source))
  }, [source])

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0)
    }
  }, [])

  return (
    <>
      <UiObjTreeNode
        label={source.constructor.name}
        subSource={source}
        path={``}
        callRootEdit={storeInput}
        nodeType={getNodeType(source)}
        level={0}
      />
    </>
  )
}

export default UiObjTreeEditor
