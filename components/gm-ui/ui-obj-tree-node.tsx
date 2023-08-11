import * as React from 'react'
import {
  iterateObjEntries,
  getChildNodes,
  getObjValue,
  setObjValue,
  deepCopy,
  getNodeType,
} from '../../utils/utils'
import { useAppContext } from '../../context/app-provider'

interface AnyObject {
  [key: string]: any
}

interface props {
  label: string
  subSource: object
  path: string
  callRootEdit: Function
  nodeType: string
  level: number
}

function UiObjTreeNode({ label, subSource, path, callRootEdit, nodeType, level }: props) {
  const ref = React.useRef()
  const [children, setChildren] = React.useState<any>([])
  const [nodeElm, setNodeElm] = React.useState<any>([])
  const [isExpanded, setIsExpanded] = React.useState(false)
  const [childStyle, setChildStyle] = React.useState({})
  const [btnStyle, setBtnStyle] = React.useState({
    border: 'none',
    backgroundColor: 'white',
    disabled: true,
  })
  const subLevel = level + 1 //with each successive call of component from parent level increments

  const setChildNodes = () => {
    let tempArr = getChildNodes(path, subSource)
    let newArr = tempArr.map((child: any) => {
      return {
        label: child.label,
        value: child.value,
        subPath: child.subPath,
        type: child.type,
        level: subLevel,
      }
    })
    setChildren(newArr)
  }

  const setNodeFormat = () => {
    switch (nodeType) {
      case 'array':
        setNodeElm('A-')
        setBtnStyle({ border: 'none', backgroundColor: 'lightBlue', disabled: false })
        break
      case 'object':
        setNodeElm('O-')
        setBtnStyle({ border: 'none', backgroundColor: 'lightGreen', disabled: false })
        break
      case 'value':
        setNodeElm('V-')
        setBtnStyle({ border: 'none', backgroundColor: 'yellow', disabled: true })
        break
    }
  }

  const toggleVisbility = () => {
    if (nodeType != 'value') {
      if (isExpanded) {
        setIsExpanded(false)
        setChildStyle({ display: 'none' })
      } else {
        setIsExpanded(true)
        setChildStyle({})
      }
    }
  }

  React.useEffect(() => {
    setChildNodes()
    setNodeFormat()
    setChildStyle({ display: 'none' })
  }, [subSource])

  //Call wrapper to change root object with new values here
  const storeInput = (event: any) => {
    if (event.keyCode === 13) {
      event.preventDefault()
      let val: any
      typeof subSource == 'number' ? (val = Number(event.target.value)) : (val = event.target.value)
      console.log(`value: ${val} path: ${path}`)
      callRootEdit(val, path)
    }
  }

  return (
    <div style={{ marginLeft: `${level * 10}px` }}>
      <button style={btnStyle} onClick={toggleVisbility}>
        {nodeElm}
        {label}
      </button>
      {nodeType === 'array' || nodeType === 'object' ? (
        <div id={`${label}-child-section`} style={childStyle}>
          {children.map((child: any, index: number) => {
            return (
              <UiObjTreeNode
                key={`${child.label}.${index}`}
                label={child.label}
                subSource={child.value}
                path={child.subPath}
                callRootEdit={callRootEdit}
                nodeType={child.type}
                level={subLevel}
              />
            )
          })}
        </div>
      ) : (
        <input type="text" id={path} onKeyDown={storeInput} placeholder={`${subSource}`}></input>
      )}
    </div>
  )
}
export default UiObjTreeNode
