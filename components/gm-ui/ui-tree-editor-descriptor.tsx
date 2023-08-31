import { useEffect, useState } from 'react'
import { setObjValue, getNodeType, deepCopy } from '../../utils/utils'
import UiTreeNode from './ui-tree-node'
import { Descriptor, DescriptorElem } from '@apptypes/input-types'
import { ObjectChanges } from '@apptypes/data-types'

type TreeProps<T extends object> = {
  name: string
  obj: any
  descriptor?: Descriptor | DescriptorElem<T>
}

function UiTreeEditorDescriptor<T extends object>({ name, obj, descriptor }: TreeProps<T>) {
  const [clonedObj, setClonedObj] = useState<any>({})
  const [objChanges, setObjChanges] = useState<ObjectChanges>()

  const storeInput = (value: any, path: string) => {
    //called from child, changes value in current cloned copy of source object
    let tempObj: object = clonedObj
    setObjValue(tempObj, path, value)
    setClonedObj(tempObj)
    console.log(tempObj)
  }

  const storeEdit = (value: any, path: string) => {
    //Store the path to and the value of the change
    //Overwrite previous elements, so using Record type to ensure uniqueness
    setObjChanges(prev => ({ ...prev, [path]: value }))
  }

  useEffect(() => {
    setClonedObj(deepCopy(obj))
  }, [obj])

  useEffect(() => {
    if (objChanges) {
      for (let [key, value] of Object.entries(objChanges)) {
        console.log(`key: ${key}, value: ${JSON.stringify(value)}`)
      }
    }
  }, [objChanges])


  return (
    <>
      <UiTreeNode
        label={name}
        subSource={clonedObj}
        descriptor={descriptor}
        path={``}
        callRootEdit={storeEdit}
        nodeType={getNodeType(clonedObj)}
        level={0}
      />
    </>
  )
}

export default UiTreeEditorDescriptor
