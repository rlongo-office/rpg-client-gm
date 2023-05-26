import React, { useState, useRef, useEffect } from 'react';

export interface Option {
  label: string;
  value: string;
}

interface MultiSelectProps {
  options: Option[];
  onChange: (selectedOptions: Option[]) => void;
  width?: number;
  toggleHeight?: number;
  title?: string;
  fontSize: string;
  grow: boolean;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  onChange,
  width = 200,
  toggleHeight = 40,
  title = 'Choose an Option',
  fontSize,
  grow = false,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [calculatedWidth, setCalculatedWidth] = useState<number>(width);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (selectedOption: Option) => {
    if (selectedOptions.some((option) => option.value === selectedOption.value)) {
      setSelectedOptions(selectedOptions.filter((option) => option.value !== selectedOption.value));
    } else {
      setSelectedOptions([...selectedOptions, selectedOption]);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    onChange(selectedOptions);
  }, [selectedOptions, onChange]);

  useEffect(() => {
    if (grow && containerRef.current) {
      const longestLabel = options.reduce((longest, option) => {
        return option.label.length > longest.length ? option.label : longest;
      }, '');

      const averageFontWidth = 7; // Assuming an average font width of 7 pixels (adjust as needed)
      const extraSpace = 10; // Additional space for left and right side padding

      const calculatedWidth = longestLabel.length * averageFontWidth + extraSpace;
      setCalculatedWidth(calculatedWidth);
    }
  }, [options, grow]);

  return (
    <div>
      <div style={{ position: 'relative', width: grow ? calculatedWidth : width }} ref={containerRef}>
        <div
          onClick={toggleDropdown}
          style={{
            backgroundColor: '#EEE',
            cursor: 'pointer',
            padding: '1px',
            border: '1px solid #CCC',
            borderRadius: '4px',
            height: toggleHeight,
            textAlign: 'center',
            fontSize: `${fontSize}`,
          }}
        >
          {title}
        </div>
        {isDropdownOpen && (
          <div
            style={{
              position: 'absolute',
              top: toggleHeight,
              left: 0,
              backgroundColor: '#FFF',
              padding: '10px',
              border: '1px solid #CCC',
              borderRadius: '4px',
              zIndex: 1,
            }}
          >
            {options.map((option) => (
              <MultiSelectOption
                key={option.value}
                option={option}
                fontSize={fontSize}
                onClick={() => handleOptionClick(option)}
                isSelected={selectedOptions.some(
                  (selectedOption) => selectedOption.value === option.value
                )}
              />
            ))}
          </div>
        )}
      </div>
      <p style={{ textAlign: 'left' }}>
        Recipients: {selectedOptions.map((option) => option.label).join(', ')}
      </p>
    </div>
  );
};

interface MultiSelectOptionProps {
  option: Option;
  onClick: () => void;
  isSelected: boolean;
  fontSize: string;
}

const MultiSelectOption: React.FC<MultiSelectOptionProps> = ({ option, onClick, isSelected, fontSize }) => {
  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: isSelected ? 'lightblue' : 'white',
        padding: '2px',
        cursor: 'pointer',
        fontSize: `${fontSize}`,
      }}
    >
      {option.label}
    </div>
  );
};

export default MultiSelect;
