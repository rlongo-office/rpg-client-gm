import React, { useState, useEffect, useRef } from 'react';
import { DescriptorElem } from '../../../types/input-types';
import { GenericStat } from '../../../types/player-types';

interface Props<T extends object> {
  source: T;
  descriptor: DescriptorElem<T>;
  onChange: (updatedObject: T) => void;
}

function GenericStatInput<T extends object>({ source, descriptor, onChange }: Props<T>) {
  const [inputValues, setInputValues] = useState<T>(source);
  const [deletable, setDeletable] = useState<boolean[]>([]);

  const inputRefs = useRef<(HTMLSelectElement | HTMLInputElement)[]>([]);

  const handleChange = (key: keyof T, value: any) => {
    setInputValues(prevInputValues => ({
      ...prevInputValues,
      [key]: value,
    }));
  };

  useEffect(() => {
    console.log(JSON.stringify(inputValues));
  }, [inputValues]);

  const handleKeyChange = (index: number, oldKey: keyof T, newKey: keyof T) => {
    if (!inputValues.hasOwnProperty(newKey)) {
      console.log(`changing key ${String(oldKey)} to key ${String(newKey)}`);
      const updatedValues = { ...inputValues };
      updatedValues[newKey] = updatedValues[oldKey];
      delete updatedValues[oldKey];
      setInputValues(updatedValues);
    } else {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = String(oldKey);
      }
    }
  };

  const handleAddRow = () => {
    // Add a new row to the state
    setInputValues(prevInputValues => ({
      ...prevInputValues,
      // Provide default values for the new row
      // Replace the following line with your desired default values
      [Object.keys(prevInputValues).length + 1]: '',
    }));
  };

  const handleRemoveRows = () => {
    // Remove the selected rows from the state
    setInputValues(prevInputValues => {
      const updatedValues = { ...prevInputValues };
      deletable.forEach((isSelected, index) => {
        if (isSelected) {
          const key = Object.keys(prevInputValues)[index];
          delete updatedValues[key as keyof T];
        }
      });
      return updatedValues;
    });

    // Clear the deletable state after removing rows
    setDeletable([]);
  };

  const handleCheckboxChange = (index: number) => {
    setDeletable(prevDeletable => {
      const updatedDeletable = [...prevDeletable];
      updatedDeletable[index] = !prevDeletable[index];
      return updatedDeletable;
    });
  };

  const handleSubmit = () => {
    onChange(inputValues);
  };

  return (
    <div>
      <div>
        <button onClick={handleAddRow}>+</button>
        <button onClick={handleRemoveRows}>-</button>
        <strong>{`Type: ${typeof source}`}</strong>
      </div>
      {Object.keys(inputValues).map((key, index) => (
        <div key={key}>
          <label>
            <input type="checkbox" checked={deletable[index] || false} onChange={() => handleCheckboxChange(index)} />
            {key}:
          </label>
          <select
            ref={el => (inputRefs.current[index] = el as HTMLSelectElement)}
            value={key}
            onChange={e => handleKeyChange(index, key as keyof T, e.target.value as keyof T)}
          >
            <option value="">Select a key</option>
            {descriptor.keysOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <input type={descriptor.input} value={inputValues[key]} onChange={e => handleChange(key as keyof T, e.target.value)} />
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default GenericStatInput;
