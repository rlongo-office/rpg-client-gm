import React, { useState, useEffect, useRef } from 'react'
import { DescriptorElem, Descriptor } from '../../../types/input-types'

interface Props<T extends object> {
  source: T
  descriptor: DescriptorElem<T>
  onChange: (updatedObject: T) => void
}

interface ChildObjectInputProps<T extends object> {
  source: T
  descriptor: Descriptor
  onChange: (updatedChildObj: T) => void
}


// Define the InputComponent as a top-level function
const InputComponent = ({
  inputType,
  inputValues,
  inputKey,
  handleChange,
  options,
  descriptor,
}) => {
  //Special case where we have a nested object
  const handleInputChange = (value) => {
    handleChange(inputKey, value);
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
  if (inputType === 'boolean') return <BooleanInput {...inputProps} />
  if (inputType === 'list') {
    return (
      <MultiSelectInput
        value={inputValues[inputKey]}
        options={options}
        onChange={handleInputChange}
      />
    );
  }
  // Add more cases for other input types if needed
  return null
}

function GenericObjectInput<T extends object>({ source, descriptor, onChange }: Props<T>) {
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
        <strong>{`Type: ${typeof source}`}</strong>
      </div>
      {Object.keys(descriptor.child).map((key, index) => (
        <div key={key}>
          <label>{key}:</label>
          {/* Pass necessary props to InputComponent */}
          <InputComponent
            inputType={descriptor.child[key].input}
            inputValues={inputValues}
            inputKey={key}
            handleChange={handleChange}
            options={descriptor.child[key].options}
            descriptor={descriptor.child[key].child}
          />
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

function ChildObjectInput<T extends object>({
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

  return (
    <div style={{ backgroundColor: `lightgray`, marginLeft: '20px', border: '1px solid #000', padding: '2px' }}>
      {Object.keys(descriptor).map((key, index) => (
        <div key={key}>
          <label>{key}:</label>
          {/* Pass necessary props to InputComponent */}
          <InputComponent
            inputType={descriptor[key].input}
            inputValues={childObj}
            inputKey={key}
            handleChange={handleChildChange}
            options={descriptor[key].options}
            descriptor={descriptor[key].child}
          />
        </div>
      ))}
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
  value: string[];
  options: string[];
  onChange: (selectedValues: string[]) => void;
}

function MultiSelectInput({ value, options, onChange }) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(value || []);

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValues:string[] = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedOptions(selectedValues);
  };

  useEffect(() => {
    onChange(selectedOptions);
  }, [selectedOptions]);

  return (
    <div style={{ backgroundColor: `lightgray`, marginLeft: '20px', border: '1px solid #000', padding: '2px' }}>
      <select multiple value={selectedOptions} onChange={handleOptionChange}>
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div>
        Selected Options: {selectedOptions.join(', ')}
      </div>
    </div>
  );
}

function BooleanInput({ value, onChange }) {
  return (
    <div>
      <label>
        <input type="radio" value="true" checked={value === true} onChange={() => onChange(true)} />{' '}
        True
      </label>
      <label>
        <input
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
