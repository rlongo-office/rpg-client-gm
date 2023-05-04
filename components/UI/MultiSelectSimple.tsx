import React, { useState } from "react";

export interface Option {
  label: string;
  value: string;
}

interface MultiSelectProps {
  options: Option[];
  onChange: (selectedOptions: Option[]) => void;
}

const MultiSelectSimple: React.FC<MultiSelectProps> = ({ options, onChange }) => {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const handleOptionClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, selectedOption: Option) => {
    event.stopPropagation();
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
    <div>
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
      {isDropdownOpen &&
        <div style={{ marginTop: "10px" }}>
          {options.map((option) => (
            <MultiSelectOption
              key={option.value}
              option={option}
              onClick={(event) => handleOptionClick(event, option)}
              isSelected={selectedOptions.some((selectedOption) => selectedOption.value === option.value)}
            />
          ))}
        </div>
      }
    </div>
  );
};

interface MultiSelectOptionProps {
  option: Option;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  isSelected: boolean;
}

const MultiSelectOption: React.FC<MultiSelectOptionProps> = ({ option, onClick, isSelected }) => {
  return (
    <div onClick={onClick} style={{ backgroundColor: isSelected ? "lightblue" : "white" }}>
      {option.label}
    </div>
  );
};

export default MultiSelectSimple;
