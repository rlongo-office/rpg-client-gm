import React, { useState, useEffect, useRef, useCallback } from 'react'
import { DescriptorElem } from '../../../types/input-types'

interface Props<T extends object> {
  source: T
  descriptor: DescriptorElem<T>
  onChange: (updatedObject: T) => void
}

function GenericObjectInput<T extends object>({ source, descriptor, onChange }: Props<T>) {
  const [inputValues, setInputValues] = useState<T>(source)
  const inputRefs = useRef<Record<string, HTMLInputElement | HTMLSelectElement>>({})

  const handleChange = (key: keyof T, value: any) => {
    setInputValues(prevInputValues => ({
      ...prevInputValues,
      [key]: value,
    }))
  }

  useEffect(() => {
    for (const key in inputRefs.current) {
      if (inputRefs.current[key]) {
        inputRefs.current[key].value = inputValues[key]
      }
    }
  }, [inputValues])

  const handleSubmit = () => {
    onChange(inputValues)
  }

  const InputComponent = ({ inputKey }) => {
    const inputType = descriptor.child[inputKey].input
    const inputProps = {
      value: inputValues[inputKey],
      inputRef: (el: HTMLInputElement | HTMLSelectElement) => {
        inputRefs.current[inputKey] = el
      },
      onChange: (newValue: any) => handleChange(inputKey, newValue),
    }

    if (inputType === 'text') return <TextInput {...inputProps} />
    if (inputType === 'number') return <NumberInput {...inputProps} />
    if (inputType === 'select')
      return <SelectInput {...inputProps} options={descriptor.child[inputKey].options} />
    if (inputType === 'boolean') return <BooleanInput {...inputProps} />
    // Add more cases for other input types if needed

    return null
  }

  return (
    <div>
      <div>
        <strong>{`Type: ${typeof source}`}</strong>
      </div>
      {Object.keys(descriptor.child).map(key => (
        <div key={key}>
          <label>{key}:</label>
          <InputComponent inputKey={key} />
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

// Debounce function that wraps the given function and delays its execution
// by the specified delay in milliseconds

export default GenericObjectInput

//Child input components

function TextInput({ inputRef, value, onChange }) {
    const [localValue, setLocalValue] = useState(value);
  
    // Create a debounced version of the onChange handler
    const debouncedOnChange = useCallback(
      debounce(newValue => {
        onChange(newValue);
      }, 300), // Adjust the debounce delay as needed
      []
    );
  
    const handleChange = e => {
      const newValue = e.target.value;
      setLocalValue(newValue); // Update the local state
      debouncedOnChange(newValue); // Call the debounced handler
    };
  
    return <input ref={inputRef} type="text" value={localValue} onChange={handleChange} />;
  }
  
  // ... (other child input components)
  
  // Debounce function
  function debounce(func, delay) {
    let timeout;
    return function (...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), delay);
    };
  }
  

function NumberInput({ value, onChange, inputRef }) {
  const bogusChange = () => {}
  return <input ref={inputRef} type="number" onChange={bogusChange} />
}

function SelectInput({ value, options, onChange, inputRef }) {
  return (
    <select ref={inputRef} value={value} onChange={onChange}>
      {options.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

function BooleanInput({ value, onChange, inputRef }) {
  return (
    <div>
      <label>
        <input
          ref={inputRef}
          type="radio"
          value="true"
          checked={value === true}
          onChange={() => onChange(true)}
        />{' '}
        True
      </label>
      <label>
        <input
          ref={inputRef}
          type="radio"
          value="false"
          checked={value === false}
          onChange={() => onChange(false)}
        />{' '}
        False
      </label>
    </div>
  )
}
