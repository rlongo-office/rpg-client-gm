import React, { useState, useEffect, useRef } from 'react'
import { DescriptorElem, Descriptor, InputType } from '../../../types/input-types'
import { capFirst } from '@utils/utils'

interface Props<T extends object> {
  source: T
  descriptor: DescriptorElem<T>
  onChange: (updatedObject: T) => void
}


type InputComponentProps = {
  inputType: InputType
  inputValues: object
  inputKey: string
  handleChange: (key: string, value: any) => void
  options?: string[]
  descriptor?: Descriptor
}

// Define the InputComponent as a top-level function
const InputComponent = ({
  inputType,
  inputValues,
  inputKey,
  handleChange,
  options,
  descriptor,
}: InputComponentProps) => {
  //Special case where we have a nested object
  const handleInputChange = value => {
    handleChange(inputKey, value)
  }
  if (inputType === 'object') {
    return (
      <ChildObjectInput
        source={inputValues[inputKey]}
        onChange={handleInputChange}
        descriptor={descriptor}
      />
    )
  }
  const inputProps = {
    value: inputValues[inputKey],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      handleChange(inputKey, e.target.value)
    },
  }

  if (inputType === 'text') return <TextInput {...inputProps} />
  if (inputType === 'number') return <NumberInput {...inputProps} />
  if (inputType === 'select') return <SelectInput {...inputProps} options={options} />
  if (inputType === 'boolean') {
    return (
      <BooleanInput
        value={inputValues[inputKey]}
        onChange={handleInputChange}
      />
    );
  }
  if (inputType === 'list') {
    return (
      <MultiSelectInput
        value={inputValues[inputKey]}
        options={options}
        onChange={handleInputChange}
      />
    )
  }
  // Add more cases for other input types if needed
  return null
}

export function GenericObjectInput<T extends object>({ source, descriptor, onChange }: Props<T>) {
  const [inputValues, setInputValues] = useState<T>(source)

  const handleChange = (key: keyof T, value: any) => {
    setInputValues(prevInputValues => ({
      ...prevInputValues,
      [key]: value,
    }))
  }

  // Create a debounced version of the handleChange function
  const handleSubmit = () => {
    onChange(inputValues)
  }

  return (
    <div>
      <div>
        <strong>{`Type: ${capFirst(typeof source)}`}</strong>
      </div>
      {Object.keys(descriptor.child).map((key, index) => (
        <div key={key} style={{ display: 'flex', alignItems: 'left', margin: '3px 0' }}>
          <label style={{ width: '80px' }}>{capFirst(key)}:</label>
          {/* Pass necessary props to InputComponent */}
          <div style={{ flex: 1 }}>
            <InputComponent
              inputType={descriptor.child[key].input as InputType}
              inputValues={inputValues}
              inputKey={key}
              handleChange={handleChange as (key: string, value: any) => void}
              options={descriptor.child[key].options as string[]}
              descriptor={descriptor.child[key].child as Descriptor}
            />
          </div>
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


interface ChildObjectInputProps<T extends object> {
  source: T
  descriptor: Descriptor | DescriptorElem<T>
  onChange: (updatedChildObj: T) => void
}

export function ChildObjectInput<T extends object>({
  source,
  descriptor,
  onChange, // New prop for the key in the parent object
}: ChildObjectInputProps<T>) {
  const [childObj, setchildObj] = useState<T>(source)
  const handleChildChange = (key: keyof T, value: any) => {
    setchildObj(prevInputValues => ({
      ...prevInputValues,
      [key]: value,
    }))
  }

  useEffect(() => {
    onChange(childObj)
  }, [childObj])


  const passedDescriptor = (descriptor as DescriptorElem<T>).child || descriptor
  //console.log(JSON.stringify(source))

  return (
    <div
      style={{
        backgroundColor: `lightgray`,
        border: '1px solid #000',
      }}
    >
      <div style={{ padding: '3px' }}>
      {Object.keys(passedDescriptor).map((key, index) => (
        <div key={key} style={{ display: 'flex', alignItems: 'center'}}>
          <label style={{ width: '80px' }}>{capFirst(key)}:</label>
          {/* Pass necessary props to InputComponent */}
          <div style={{ flex: 1, marginLeft: '10px' }}>
            <InputComponent
              inputType={passedDescriptor[key].input as InputType}
              inputValues={childObj}
              inputKey={key}
              handleChange={handleChildChange as (key: string, value: any) => void}
              options={passedDescriptor[key].options as string[]}
              descriptor={passedDescriptor[key].child as Descriptor}
            />
          </div>
        </div>
      ))}
      </div>
    </div>
  )
}

function TextInput({ value, onChange }) {
  return <input type="text" value={value} onChange={onChange} />
}

function NumberInput({ value, onChange }) {
  return <input type="number" value={value} onChange={onChange} />
}

function SelectInput({ value, options, onChange }) {
  return (
    <select value={value} onChange={onChange}>
      {options.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

type MultiSelectInputProps = {
  value: string[]
  options: string[]
  onChange: (selectedValues: string[]) => void
}

function MultiSelectInput({ value, options, onChange }) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(value || [])

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValues: string[] = Array.from(e.target.selectedOptions, option => option.value)
    setSelectedOptions(selectedValues)
  }

  useEffect(() => {
    onChange(selectedOptions)
  }, [selectedOptions])

  return (
    <div
      style={{
        backgroundColor: `lightgray`,
        border: '1px solid #000',
        
      }}
    > <div style={{padding: '3px'}}>
      <select multiple value={selectedOptions} onChange={handleOptionChange}>
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div>Selected Options: {selectedOptions.join(', ')}</div>
      </div>
    </div>
  )
}

function BooleanInput({ value, onChange }) {
  return (
    <div>
      <label>
        <input
          type="radio"
          checked={value === true}
          name="boolean-input"
          value="true"
          onChange={() => onChange(true)}
        />
        True
      </label>
      <label>
        <input
          type="radio"
          checked={value === false}
          name="boolean-input"
          value="false"
          onChange={() => onChange(false)}
        />
        False
      </label>
    </div>
  );
}
