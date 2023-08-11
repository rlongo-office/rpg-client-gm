import { getStringWidth } from '@utils/utils'
import React, { useState, useRef, useEffect } from 'react'

export interface Option {
  label: string
  value: string
}

interface MultiSelectProps {
  options: Option[]
  multiSelect: boolean
  onChange: (selectedOptions: Option[]) => void
  width?: number
  toggleHeight?: number
  title?: string
  fontSize: string
  grow: boolean
  parentClick: boolean
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  multiSelect = true,
  onChange,
  width = 200,
  toggleHeight = 40,
  title = 'Choose an Option',
  fontSize,
  grow = false,
  parentClick = false,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([])
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
  const [isDropdownListOpen, setIsDropdownListOpen] = useState<boolean>(false)
  const [calculatedWidth, setCalculatedWidth] = useState<number>(width)

  // Remove "px" characters from the fontSize prop and parse it as an integer
  const parsedFontSize = parseInt(fontSize.replace('px', ''), 10)

  const handleOptionClick = (selectedOption: Option) => {
    if (!multiSelect) {
      if (selectedOptions.length === 0 || selectedOptions[0].value !== selectedOption.value) {
        setSelectedOptions([selectedOption])
      }
    }  else if (selectedOptions.some(option => option.value === selectedOption.value)) {
      setSelectedOptions(selectedOptions.filter(option => option.value !== selectedOption.value))
    } else {
      setSelectedOptions([...selectedOptions, selectedOption])
    }
  }
  
  const toggleDropdownList = () => {
    setIsDropdownListOpen(!isDropdownListOpen)
    //We dont want to toggle the parent div on a mouse leave, so we need the 
    //child "List Div" to tell the parent it's going to close

    if (!isDropdownListOpen){
      setIsDropdownOpen(false)
    }
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }


  useEffect(() => {
    setIsDropdownOpen(false)
  }, [parentClick])

  useEffect(() => {
    onChange(selectedOptions)
  }, [selectedOptions, onChange])

  useEffect(() => {
    if (grow && options) {
      debugger
      let seedLength: number
      const longestLabel = options.reduce((longest, option) => {
        return option.label.length > longest.length ? option.label : longest
      }, '')
      seedLength = longestLabel.length > title.length ? longestLabel.length : title.length

      const averageFontWidth = 0.6 * parsedFontSize // Assuming an average font width of 7 pixels (adjust as needed)
      const extraSpace = 5 // Additional space for left and right side padding
      const font = `${fontSize} Arial`
      //const calculatedWidth = seedLength * averageFontWidth + extraSpace
      let calculatedWidth = getStringWidth(longestLabel, font);
      setCalculatedWidth(calculatedWidth)
    }
  }, [options, grow])

  return (
    <div id="MultiSelect Level 0 Div" style={{ backgroundColor:'blue',position: 'relative', width: grow ? calculatedWidth : width }}>
      <div id="MultiSelect Level 1  Div">
        <div
          id="MultiSelect div button"
          onMouseEnter={toggleDropdown}
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
          <div id="List Div"
          onMouseEnter={toggleDropdownList}
          onMouseLeave={toggleDropdownList}
            style={{
              position: 'absolute',
              top: toggleHeight,
              left: 0,
              backgroundColor: '#FFF',
              padding: '10px',
              border: '1px solid #CCC',
              borderRadius: '4px',
              zIndex: 1,
              maxHeight: '300px', // Adjust the max height as needed
              overflow: 'auto',
            }}
          >
            {options.map(option => (
              <MultiSelectOption
                key={option.value}
                option={option}
                fontSize={fontSize}
                onChange={() => handleOptionClick(option)}
                isSelected={selectedOptions.some(
                  selectedOption => selectedOption.value === option.value
                )}
              />
            ))}
          </div>
        )}
      </div>
      <p style={{ textAlign: 'left' }}>
        Recipients: {selectedOptions.map(option => option.label).join(', ')}
      </p>
    </div>
  )
}

interface MultiSelectOptionProps {
  option: Option
  onChange: () => void
  isSelected: boolean
  fontSize: string
}

const MultiSelectOption: React.FC<MultiSelectOptionProps> = ({
  option,
  onChange,
  isSelected,
  fontSize,
}) => {
  function onClickHandler(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
    event.stopPropagation()
    onChange()
  }

  return (
    <div
      onClick={onClickHandler}
      style={{
        backgroundColor: isSelected ? 'lightblue' : 'white',
        padding: '2px',
        cursor: 'pointer',
        fontSize: `${fontSize}`,
        fontFamily: 'Arial',
      }}
    >
      {option.label}
    </div>
  )
}

export default MultiSelect

