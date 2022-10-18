import { useGesture } from '@use-gesture/react'
import React from 'react'
import { useAppContext } from '../../context/app-provider'

export default function ImageWrapper() {
  const { images } = useAppContext()
  const [status, setStatus] = React.useState('Nothing')
  let imageRef = React.useRef()
  useGesture(
    {
      onDrag: () => {
        console.log('dragging')
        setStatus("dragging")
      },
      onPinch: () => {
        console.log('pinching')
        setStatus("pinching")
      },
    },
    { target: imageRef }
  )

  return (
    <>
      <a>{status}</a>  
      <div style={{ overflow: 'hidden', width: '350px', height: '350px' }}>
        <div>
          <img
            src={`data:image/jpeg;base64,${images[0]}`}
            ref={imageRef}
            style={{ touchAction: 'none' }}
          />
        </div>
      </div>
    </>
  )
}
