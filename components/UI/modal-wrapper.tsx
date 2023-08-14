import React, { useState, useEffect } from 'react'

const modalStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999,
}

const closedStyle = {
  display: 'none',
}

const modalContentStyle: React.CSSProperties = {
  // Explicitly cast as React.CSSProperties
  backgroundColor: 'white',
  display: 'flex',
  flexDirection: 'column',
  padding: '20px',
  borderRadius: '4px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
  maxWidth: '400px',
  width: '100%',
}

const closeButtonStyle: React.CSSProperties = {
  width: '150px',
  alignSelf: 'flex-end', // Right-justify the button
}

type ModalProps = {
  isVisible: boolean
}

function WithModalWrapper<P extends object>(WrappedComponent: React.ComponentType<P>) {
  return function WithModalBehaviorComponent(props: P & ModalProps) {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
      setIsOpen(props.isVisible)
    }, [props.isVisible])

    return (
      <div style={isOpen ? modalStyle : closedStyle}>
        <div className="modal">
          <div style={modalContentStyle}>
            {/* WrappedComponent receives its own props */}
            <WrappedComponent {...props} />
            <button id="toggleVisible" onClick={() => setIsOpen(false)} style={closeButtonStyle}>
              Close Editor
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default WithModalWrapper
