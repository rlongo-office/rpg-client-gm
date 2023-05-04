import React, { useState, useRef } from "react";

export interface Option {
  label: string;
  value: string;
}

interface MultiSelectProps {
    options: Option[];
    onChange: (selectedOptions: Option[]) => void;
  }
  
  const MultiSelect: React.FC<MultiSelectProps> = ({ options, onChange }) => {
    const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  
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
  
    React.useEffect(() => {
      onChange(selectedOptions);
    }, [selectedOptions, onChange]);
  
    return (
      <div style={{ position: "relative" }}>
        <div
          onClick={toggleDropdown}
          style={{
            backgroundColor: "#EEE",
            cursor: "pointer",
            padding: "10px",
            border: "1px solid #CCC",
            borderRadius: "4px",
          }}
        >
          Choose an Option
        </div>
        {isDropdownOpen && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              backgroundColor: "#FFF",
              padding: "10px",
              border: "1px solid #CCC",
              borderRadius: "4px",
              zIndex: 1,
            }}
          >
            {options.map((option) => (
              <MultiSelectOption
                key={option.value}
                option={option}
                onClick={() => handleOptionClick(option)}
                isSelected={selectedOptions.some((selectedOption) => selectedOption.value === option.value)}
              />
            ))}
          </div>
        )}
      </div>
    );
  };
  

interface MultiSelectOptionProps {
  option: Option;
  onClick: () => void;
  isSelected: boolean;
}

const MultiSelectOption: React.FC<MultiSelectOptionProps> = ({ option, onClick, isSelected }) => {
  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: isSelected ? "lightblue" : "white",
        padding: "10px",
        cursor: "pointer",
      }}
    >
      {option.label}
    </div>
  );
};

export default MultiSelect;
