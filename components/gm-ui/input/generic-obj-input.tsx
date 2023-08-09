import React, { useState, useEffect, useRef } from 'react';
import { DescriptorElem } from '../../../types/input-types';

interface Props<T extends object> {
  source: T;
  descriptor: DescriptorElem<T>;
  onChange: (updatedObject: T) => void;
}

// Define the InputComponent as a top-level function
const InputComponent = ({ inputType, inputValues, inputKey, handleChange, debouncedHandleChange, options }) => {
  const inputProps = {
    value: inputValues[inputKey],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      handleChange(inputKey, e.target.value);
    },
  };
  
  if (inputType === 'text') return <TextInput {...inputProps}/>;
  if (inputType === 'number') return <NumberInput {...inputProps}/>;
  if (inputType === 'select')
    return (
      <SelectInput
        {...inputProps}
        options={options}
      />
    );
  if (inputType === 'boolean') return <BooleanInput {...inputProps} />;
  // Add more cases for other input types if needed
  return null;
};


function GenericObjectInput<T extends object>({ source, descriptor, onChange }: Props<T>) {
  const [inputValues, setInputValues] = useState<T>(source);

  const handleChange = (key: keyof T, value: any) => {
    setInputValues(prevInputValues => ({
      ...prevInputValues,
      [key]: value,
    }));
  };

  // Create a debounced version of the handleChange function
  const debouncedHandleChange = useRef(
    debounce((key: keyof T, value: any) => {
      setInputValues(prevInputValues => ({
        ...prevInputValues,
        [key]: value,
      }));
    }, 100)
  ).current;

  const handleSubmit = () => {
    onChange(inputValues);
  };

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
            debouncedHandleChange={debouncedHandleChange}
            options={descriptor.child[key].options}
          />
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

// Debounce function that wraps the given function and delays its execution
// by the specified delay in milliseconds
function debounce(func: (...args: any[]) => void, delay: number) {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export default GenericObjectInput;


//Child input components

function TextInput({ value, onChange }) {
  return <input type="text" value={value} onChange={onChange} />;
}

function NumberInput({ value, onChange }) {
  return <input type="number" value={value} onChange={onChange} />;
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
  );
}

function BooleanInput({ value, onChange }) {
  return (
    <div>
      <label>
        <input
          type="radio"
          value="true"
          checked={value === true}
          onChange={() => onChange(true)}
        />{' '}
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
  );
}
