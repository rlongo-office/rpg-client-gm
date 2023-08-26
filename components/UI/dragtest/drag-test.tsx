import React, { useState } from 'react'

const icons = ['bomber', 'fighter', 'tank', 'artillery', 'infantry']
const rowColors = [
  'gray',
  'red',
  'red',
  'green',
  'green',
  'lightgreen',
  'lightgreen',
  'lightblue',
  'lightblue',
  'lightyellow',
  'lightyellow',
]

interface DroppedIcon {
  icon: string
  rowIndex: number
  colIndex: number
}

const DragAndDropGrid: React.FC = () => {
  const [droppedIcons, setDroppedIcons] = useState<DroppedIcon[]>([])
  const [draggedIcon, setDraggedIcon] = useState<string | null>(null)
  const [dragIdx, setDragIdx] = useState<number | null>(null)
  //Initialze 2d array of unit quantities for each area below the first row
  const [unitQty, setUnitQty] = useState<number[][]>(
    new Array(10).fill(0).map(() => new Array(7).fill(0))
  )

  const handleDragStart = (icon: string) => {
    setDraggedIcon(icon)
    setDragIdx(icons.indexOf(icon))
  }

  const handleDragEnd = () => {
    setDraggedIcon(null)
  }

  const handleDrop = (rowIndex: number, colIndex: number) => {
    if (
      draggedIcon !== null &&
      rowIndex >= 1 &&
      colIndex != 3 &&
      (dragIdx * 2 + 2 === rowIndex || dragIdx * 2 + 1 === rowIndex)
    ) {
      if (unitQty[rowIndex - 1][colIndex] === 0) {
        const newDroppedIcon: DroppedIcon = { icon: draggedIcon, rowIndex, colIndex }
        setDroppedIcons(prevDroppedIcons => [...prevDroppedIcons, newDroppedIcon])
      }
      setUnitQty(prevUnitQty => {
        const newUnitQty = [...prevUnitQty]
        newUnitQty[rowIndex - 1][colIndex] += 1
        return newUnitQty
      })
    }
    setDraggedIcon(null)
  }

  return (
    <div
      style={{ display: 'grid', gridTemplateRows: 'repeat(11, 1fr)', gap: '4px', padding: '20px' }}
    >
      {rowColors.map((rowColor, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex', backgroundColor: rowColor }}>
          {rowIndex === 0
            ? icons.map((icon, colIndex) => (
                <div
                  key={colIndex}
                  style={{
                    flex: 1,
                    height: '50px',
                    border: '1px solid #ccc',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <img
                    src={`/${icon}.png`} // Assuming your images are in the 'icons' folder within the 'public' folder
                    alt={icon}
                    draggable
                    onDragStart={() => handleDragStart(icon)}
                    onDragEnd={handleDragEnd}
                    style={{ width: '30px', height: '30px', cursor: 'pointer', margin: '2px' }}
                  />
                </div>
              ))
            : new Array(7).fill(null).map((_, colIndex) => (
                <div
                  key={colIndex}
                  style={{
                    flex: 1,
                    height: '50px',
                    border: '1px solid #ccc',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative', // Add this line
                  }}
                  onDragOver={e => e.preventDefault()}
                  onDrop={() => handleDrop(rowIndex, colIndex)} // Call handleDrop when dropping on this div
                >
                  {droppedIcons.map(droppedIcon => {
                    if (droppedIcon.rowIndex === rowIndex && droppedIcon.colIndex === colIndex) {
                      return (
                        <img
                          key={`${rowIndex}-${colIndex}-${droppedIcon.icon}`}
                          src={`/${droppedIcon.icon}.png`}
                          alt={droppedIcon.icon}
                          style={{ width: '30px', height: '30px' }}
                          onDragStart={() => handleDragStart(droppedIcon.icon)}
                          onDragEnd={handleDragEnd}
                        />
                      )
                    }
                    return null
                  })}
                  {/* Display unitQty value if it's greater than 0 */}
                  {unitQty[rowIndex - 1][colIndex] > 0 && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        color: 'Black',
                        padding: '2px 5px',
                        borderRadius: '4px',
                        fontSize: '30px',
                        fontWeight: 'bold',
                      }}
                    >
                      {unitQty[rowIndex - 1][colIndex]}
                    </div>
                  )}
                </div>
              ))}
        </div>
      ))}
    </div>
  )
}

export default DragAndDropGrid
