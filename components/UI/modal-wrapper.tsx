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
  };

  const closedStyle = {
    display: 'none',
  };

  const modalContentStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '4px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    maxWidth: '400px',
    width: '100%',
  };



// Simply extend P with ModalWrapperProps
function withModalBehavior<P extends { isVisible: boolean }>(
  WrappedComponent: React.ComponentType<P>
) {
  return function WithModalBehaviorComponent(props: P) {
    const [isOpen, setIsOpen] = useState(false)

    const { isVisible, ...restProps } = props

    useEffect(() => {
      setIsOpen(isVisible)
    }, [isVisible])

    return (
      <div style={isOpen ? modalStyle : closedStyle}>
        <button id="toggleVisible" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? 'Close Modal' : 'Open Modal'}
        </button>
        {isOpen && (
          <div className="modal">
            <div style={modalContentStyle }>
              {/* WrappedComponent receives its own props */}
              <WrappedComponent {...restProps as P} isVisible={isOpen} />
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default withModalBehavior
