import * as React from 'react'
import {
  setObjValue,
  getNodeType
} from '../../utils/utils'
import UiTreeNode from './ui-tree-node'
import { Descriptor } from '@apptypes/input-types'
import { ObjectChanges } from '@apptypes/data-types'

type TreeProps = {
    name: string
    obj: object
    descriptor?:Descriptor 
}


function UiTreeEditor({name,obj,descriptor}: TreeProps) {

  const [clonedObj, setClonedObj] = React.useState<any>({})
const [objChanges,setObjChanges] = React.useState<ObjectChanges>()

  const storeInput = (value: any, path: string) => {
    //called from child, changes value in current cloned copy of source object
    let tempObj: object = clonedObj
    setObjValue(tempObj, path, value)
    setClonedObj(tempObj)
    console.log(tempObj)
  }

 const storeEdit=(value: any, path: string) => {
\ //Store the path to and the value of the change
  //Overwrite previous elements, so using Record type to ensure uniqueness
  setObjChanges(prevObjChanges=>{

  })
}


React.useEffect(()=>{setClonedObj(obj)},[])

  return (
    <>
      <UiTreeNode
        label={name}
        subSource={clonedObj}
        descriptor={descriptor}
        path={``}
        callRootEdit={storeInput}
        nodeType={getNodeType(clonedObj)}
        level={0}
      />
    </>
  )
}

export default UiTreeEditor
