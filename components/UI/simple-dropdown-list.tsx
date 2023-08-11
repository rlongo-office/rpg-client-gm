import React, { useState } from 'react';

interface Props {
  options: string[];
  onSelect: (selectedOption: string) => void;
}

const SimpleDropdownList: React.FC<Props> = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleSelect = (selectedOption: string) => {
    setSelectedOption(selectedOption);
    onSelect(selectedOption);
    setIsOpen(false);
  };

  return (
    <div>
      <div style={{ border: '1px solid black', padding: '5px', cursor: 'pointer' }} onClick={toggleDropdown}>
        {selectedOption || 'Select an option'}
      </div>
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            zIndex: 9999,
            backgroundColor: 'white',
            borderRadius: '4px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          }}
        >
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {options.map((option) => (
              <li key={option} style={{ padding: '5px', cursor: 'pointer' }} onClick={() => handleSelect(option)}>
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SimpleDropdownList;
