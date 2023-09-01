import * as React from 'react'
import { capFirst,capReturnFirst, getChildNodes } from '../../utils/utils'
import withModalBehavior from '../UI/modal-wrapper'
import GenericObjectArrayInput from './input/generic-obj-array-input'
import GenericObjectInput from './input/generic-obj-input'
import GenericStatInput from './input/generic-stat-input'
import { DescriptorElem } from '@apptypes/input-types'

interface childProps<T extends object> {
  index: string | number
  subSource: object
  descriptor: DescriptorElem<T>
  path: string
  callRootEdit: Function
  nodeType: string
  level: number
}

const divCircleStyle = {
  width: '15px',
  height: '15px',
  borderRadius: '50%',
  backgroundColor: 'white',
}

function UiTreeNodeDescriptor<T extends object>({
  index,
  subSource,
  descriptor,
  path,
  callRootEdit,
  nodeType,
  level,
}: childProps<T>) {
  const [children, setChildren] = React.useState<any>([])
  const [isExpanded, setIsExpanded] = React.useState(false)
  const [childStyle, setChildStyle] = React.useState({})
  const [divStyle, setDivStyle] = React.useState<React.CSSProperties>(divCircleStyle)
  const [isInputVisible, setIsInputVisible] = React.useState(false) // State to manage modal visibility
  const subLevel = level + 1 //with each successive call of component from parent level increments

  const nonInputComponent = descriptor.input === 'none' || nodeType === 'primitive'
  let WrappedInput: React.ComponentType<any> | null = null
  if (!nonInputComponent) {
    WrappedInput =
      nodeType === 'array'
        ? withModalBehavior(GenericObjectArrayInput as React.ComponentType<any>)
        : descriptor.input === 'stat-object'
        ? withModalBehavior(GenericStatInput as React.ComponentType<any>)
        : withModalBehavior(GenericObjectInput as React.ComponentType<any>)
  }
  const onChange = (value: any) => {
    callRootEdit(value, path)
  }
  const setChildNodes = () => {
    let tempArr = getChildNodes(path, subSource, descriptor)
    let newArr = tempArr.map((child: any) => {
      const tempChild: childProps<T> = {
        index: child.index,
        subSource: child.value,
        path: child.subPath,
        nodeType: child.nodeType,
        level: subLevel,
        descriptor: descriptor.child[index],
        callRootEdit: callRootEdit,
      }
      return tempChild
    })

    setChildren(newArr)
  }

  const setNodeStyle = () => {
    switch (nodeType) {
      case 'array':
        setDivStyle({ ...divStyle, border: '1px', backgroundColor: 'BlueViolet' })
        break
      case 'object':
        setDivStyle({ ...divStyle, border: '1px', backgroundColor: 'green' })
        break
      case 'primitive':
        setDivStyle({ ...divStyle, border: '1px', backgroundColor: 'gold' })
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
    if (!nonInputComponent) setIsInputVisible(prev => !prev)
  }

  return (
    <div style={{ marginLeft: `${level * 10}px`, marginTop: '5px' }}>
      <div id={`${index}-div`} style={{ display: 'flex', flexDirection: 'row' }}>
        <button
          id={`${index}-div-btn`}
          style={{ ...divStyle, verticalAlign: 'middle', margin: '5px 5px 5px' }}
          onClick={toggleVisibility}
          onDoubleClick={callInputWrapper}
        ></button>
        <div id={`${index}-label`} style={{ verticalAlign: 'middle' }}>{`${capReturnFirst(
          nodeType
        )}-${index}`}</div>
      </div>
      {descriptor && descriptor.child && (
        <>
          <div id={`${index}-child-section`} style={childStyle}>
            {children.map((child: any, cIdx: number) => {
              console.log(`child ${cIdx} for parent ${index}: ${JSON.stringify(child)}`)
              return (
                <UiTreeNodeDescriptor
                  key={`${child.index}.${cIdx}`}
                  index={child.index}
                  subSource={child.value}
                  descriptor={child.descriptor}
                  path={child.subPath}
                  callRootEdit={callRootEdit}
                  nodeType={child.nodeType}
                  level={subLevel}
                />
              )
            })}
          </div>
        </>
      )}
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
