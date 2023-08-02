import * as React from 'react'
import {
  setObjValue,
  getNodeType
} from '../../utils/utils'
import UiTreeNode from './ui-tree-node'

type TreeProps = {
    name: string
    obj: object
    metaData?: object
}


function UiTreeEditor({name,obj,metaData}: TreeProps) {

  const [clonedObj, setClonedObj] = React.useState<any>({})

  const storeInput = (value: any, path: string) => {
    //called from child, changes value in current cloned copy of source object
    let tempObj: object = clonedObj
    setObjValue(tempObj, path, value)
    setClonedObj(tempObj)
    console.log(tempObj)
  }

  React.useEffect(() => {
    setClonedObj(obj)
  }, [])

  return (
    <>
      <UiTreeNode
        label={name}
        subSource={clonedObj}
        metaData={metaData}
        path={``}
        callRootEdit={storeInput}
        nodeType={getNodeType(clonedObj)}
        level={0}
      />
    </>
  )
}

export default UiTreeEditor
