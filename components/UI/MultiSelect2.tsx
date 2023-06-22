import React, { useState, useRef, useEffect } from 'react'

export interface Option {
  label: string
  value: string
}

interface MultiSelectProps {
  options: Option[]
  onChange: (selectedOptions: Option[]) => void
  width?: number
  toggleHeight?: number
  title?: string
  fontSize: string
  grow: boolean
  parentClick: boolean
}

const MultiSelect2: React.FC<MultiSelectProps> = ({
  options,
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
  const [calculatedWidth, setCalculatedWidth] = useState<number>(width)

  const parsedFontSize = parseInt(fontSize.replace('px', ''), 10)

  const handleOptionClick = (selectedOption: Option) => {
    if (selectedOptions.some(option => option.value === selectedOption.value)) {
      setSelectedOptions(selectedOptions.filter(option => option.value !== selectedOption.value))
    } else {
      setSelectedOptions([...selectedOptions, selectedOption])
    }
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const wrapperRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false)
    }
  }

  useEffect(() => {
    setIsDropdownOpen(false)
  }, [parentClick])

  useEffect(() => {
    onChange(selectedOptions)
  }, [selectedOptions, onChange])

  useEffect(() => {
    if (grow) {
      let seedLength: number
      const longestLabel = options.reduce((longest, option) => {
        return option.label.length > longest.length ? option.label : longest
      }, '')
      seedLength = longestLabel.length > title.length ? longestLabel.length : title.length

      const averageFontWidth = 0.6 * parsedFontSize // Assuming an average font width of 7 pixels (adjust as needed)
      const extraSpace = 5 // Additional space for left and right side padding

      const calculatedWidth = seedLength * averageFontWidth + extraSpace
      setCalculatedWidth(calculatedWidth)
    }
  }, [options, grow])

  useEffect(() => {
    window.addEventListener('click', handleClickOutside)
    return () => {
      window.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <div>
      <div ref={wrapperRef} style={{ position: 'relative', width: grow ? calculatedWidth : width }}>
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
  const onClickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
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
      }}
    >
      {option.label}
    </div>
  )
}

export default MultiSelect2
