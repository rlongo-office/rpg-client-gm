import React, { useState, useEffect, useRef } from 'react'
import { DescriptorElem, Descriptor } from '../../../types/input-types'
import { ChildObjectInput, GenericObjectInput } from './generic-obj-input'
import { createBlankObjectFromDescriptor } from '@utils/utils'

interface Props<T extends object> {
  source: T[]
  descriptor: DescriptorElem<T>
  onChange: (updatedArray: T[]) => void
}

function GenericObjectArrayInput<T extends object>({ source, descriptor, onChange }: Props<T>) {
  const [objArray, setObjArray] = useState<T[]>(source)
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)
  const [deletable, setDeletable] = useState<boolean[]>(new Array(objArray.length).fill(false))

  const inputRefs = useRef<(HTMLSelectElement | HTMLInputElement)[]>([])

  const handleChange = (index: number, value: T) => {
    setObjArray(prevArray => prevArray.map((item, i) => (i === index ? value : item)))
  }

  useEffect(() => {
    setDeletable(new Array(objArray.length).fill(false))
  }, [objArray])

  const handleAddObj = () => {
        const objChildDescriptor = descriptor.child as DescriptorElem<T>;
        console.log(JSON.stringify(objChildDescriptor))
        const newObj: T = createBlankObjectFromDescriptor(objChildDescriptor);
        console.log(JSON.stringify(newObj))
        setObjArray(prevArray => [...prevArray, newObj]);
        setSelectedIdx(objArray.length); // Select the newly added object
    }

  const handleRemoveObj = () => {
    if (selectedIdx !== null) {
      if (deletable[selectedIdx]) {
        const newArray = objArray.filter((_, index) => index !== selectedIdx)
        setObjArray(newArray)
        setSelectedIdx(null)
      } else {
        const newDeletable = [...deletable]
        newDeletable[selectedIdx] = true
        setDeletable(newDeletable)
      }
    }
  }

  const handleSubmit = () => {
    onChange(objArray)
  }

  return (
    <div>
      <select onChange={event => setSelectedIdx(Number(event.target.value))}>
        <option value={-1}>Select an object to edit</option>
        {objArray.map((_, index) => (
          <option key={index} value={index}>
            Object {index + 1}
          </option>
        ))}
      </select>
      <button onClick={handleAddObj}>Add Object</button>
      <button onClick={handleRemoveObj}>Remove Object</button>
      {selectedIdx !== null && (
        <ChildObjectInput
          key={selectedIdx}
          source={objArray[selectedIdx]}
          descriptor={descriptor.child as DescriptorElem<T>}
          onChange={value => handleChange(selectedIdx, value)}
        />
      )}
      <button onClick={handleSubmit}>Submit Changes</button>
    </div>
  )
}

export default GenericObjectArrayInput
