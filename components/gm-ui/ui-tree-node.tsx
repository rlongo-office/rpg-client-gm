import * as React from 'react'
import { getChildNodes } from '../../utils/utils'
import withModalBehavior from '../UI/modal-wrapper'
import TextInput from './input/text-input'

interface props {
  label: string
  subSource: object
  metaData: object
  path: string
  callRootEdit: Function
  nodeType: string
  level: number
}

function UiTreeNode({ label, subSource, metaData, path, callRootEdit, nodeType, level }: props) {
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

  const toggleVisibility = () => {
    if (isExpanded) {
      setIsExpanded(false)
      setChildStyle({ display: 'none' })
    } else {
      setIsExpanded(true)
      setChildStyle({})
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
      {(nodeType === 'array' || nodeType === 'object') && (
        <>
          <button id="node-label" style={btnStyle} onClick={toggleVisibility}>
            {nodeElm}
            {label}
          </button>
          <div id={`${label}-child-section`} style={childStyle}>
            {children.map((child: any, index: number) => {
              return (
                <UiTreeNode
                  key={`${child.label}.${index}`}
                  label={child.label}
                  subSource={child.value}
                  metaData={metaData}
                  path={child.subPath}
                  callRootEdit={callRootEdit}
                  nodeType={child.type}
                  level={subLevel}
                />
              )
            })}
          </div>
        </>
      )}
      {nodeType === 'value' && <ValueNode btnStyle={btnStyle} nodeElm={nodeElm} label={label} />}
    </div>
  )
}
export default UiTreeNode

function ValueNode({
  nodeElm,
  label,
  btnStyle
}: {
  nodeElm: string
  label: string
  btnStyle: object
}) {
  // State to manage the visibility of ModalTextInput
  const [isVisible, setIsVisible] = React.useState(false)
  const ModalTextInput = withModalBehavior(TextInput)

  // Function to toggle the visibility of ModalTextInput
  const toggleVisibility = () => {
    setIsVisible(prev => !prev)
  }

  return (
    <>
      <button id="node-label" style={btnStyle} onClick={toggleVisibility}>
        {nodeElm}
        {label}
      </button>
      {/* Pass the isVisible prop to ModalTextInput */}
      {isVisible && <ModalTextInput isVisible={isVisible} />}
    </>
  )
}
