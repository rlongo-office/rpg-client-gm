import * as React from 'react'
import { capFirst, getChildNodes } from '../../utils/utils'
import withModalBehavior from '../UI/modal-wrapper'
import GenericObjectArrayInput from './input/generic-obj-array-input'
import GenericObjectInput from './input/generic-obj-input'
import GenericStatInput from './input/generic-stat-input'
import { Descriptor, DescriptorElem } from '@apptypes/input-types'

interface props<T extends object> {
  label: string
  subSource: object
  descriptor: Descriptor | DescriptorElem<T>
  path: string
  callRootEdit: Function
  nodeType: string
  level: number
}

const divCircleStyle = {
  width: '50px' /* Set the width and height to control the size of the circle */,
  height: '50px',
  borderRadius: '50%' /* Makes the div circular */ /* Optional background color for illustration */,
  backgroundColor: 'white',
  disabled: false,
}

function UiTreeNodeDescriptor<T extends object>({
  label,
  subSource,
  descriptor,
  path,
  callRootEdit,
  nodeType,
  level,
}: props<T>) {
  const [children, setChildren] = React.useState<any>([])
  const [isExpanded, setIsExpanded] = React.useState(false)
  const [childStyle, setChildStyle] = React.useState({})
  const [divStyle, setDivStyle] = React.useState<React.CSSProperties>(divCircleStyle)
  const [isInputVisible, setIsInputVisible] = React.useState(false) // State to manage modal visibility
  const subLevel = level + 1 //with each successive call of component from parent level increments

  const WrappedInput =
    nodeType === 'array'
      ? withModalBehavior(GenericObjectArrayInput as React.ComponentType<any>)
      : descriptor.input === 'stat-object'
      ? withModalBehavior(GenericStatInput as React.ComponentType<any>)
      : withModalBehavior(GenericObjectInput as React.ComponentType<any>)

  const onChange = (value: any) => {
    callRootEdit(value, path)
  }
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

  const setNodeStyle = () => {
    switch (descriptor.type) {
      case 'array':
        setDivStyle({ ...divStyle, border: '1px', backgroundColor: 'lightBlue' })
        break
      case 'object':
        setDivStyle({ ...divStyle, border: '1px', backgroundColor: 'lightGreen' })
        break
      case 'primitive':
        setDivStyle({ ...divStyle, border: '1px', backgroundColor: 'yellow' })
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
    if (nodeType !== 'primitive') setChildNodes()
    setNodeStyle()
    setChildStyle({ display: 'none' })
  }, [subSource])

  //Call wrapper to change root object with new values here

  function callInputWrapper(): void {
    setIsInputVisible(prev => !prev)
  }

  return (
    <div style={{ marginLeft: `${level * 10}px` }}>
      <div style={divStyle} onClick={toggleVisibility} onDoubleClick={callInputWrapper}>
        {`${capFirst(nodeType)}-${label}`}
        {descriptor && descriptor.child && (
          <>
            <div id={`${label}-child-section`} style={childStyle}>
              {children.map((child: any, index: number) => {
                return (
                  <UiTreeNodeDescriptor
                    key={`${child.label}.${index}`}
                    label={child.label}
                    subSource={child.value}
                    descriptor={descriptor}
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
      </div>
      {isInputVisible && (
        <WrappedInput
          source={subSource}
          descriptor={descriptor}
          onChange={onChange}
          isVisible={isInputVisible} // Pass the visibility prop
        />
      )}
    </div>
  )
}
export default UiTreeNodeDescriptor
