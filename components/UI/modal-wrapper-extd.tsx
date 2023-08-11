import React, { useState, useEffect } from 'react';

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
  }

function withModalBehavior<P extends { isVisible: boolean; source: object; callback: Function; descriptor: object }>(
  WrappedComponent: React.ComponentType<P>
) {
  return function WithModalBehaviorComponent(props: P) {
    const [isOpen, setIsOpen] = useState(false);

    const { isVisible, source, callback, descriptor, ...restProps } = props;

    useEffect(() => {
      setIsOpen(isVisible);
    }, [isVisible]);

    const handleChange = (key: string, value: any) => {
      const updatedSource = { ...source, [key]: value };
      callback(updatedSource);
    };

    return (
      <div style={isOpen ? modalStyle : closedStyle}>
        <button id="toggleVisible" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? 'Close Modal' : 'Open Modal'}
        </button>
        {isOpen && (
          <div className="modal">
            <div style={modalContentStyle}>
              {Object.keys(source).map((key) => {
                if (descriptor[key]) {
                  const { label, type } = descriptor[key];
                  return (
                    <div key={key}>
                      <label htmlFor={key}>{label}</label>
                      <input
                        type={type}
                        id={key}
                        value={source[key]}
                        onChange={(e) => handleChange(key, e.target.value)}
                      />
                    </div>
                  );
                } else {
                  return (
                    <div key={key}>
                      <strong>{key}: </strong>
                      <span>{source[key]}</span>
                    </div>
                  );
                }
              })}
              <button onClick={() => setIsOpen(false)}>Close</button>
            </div>
          </div>
        )}
      </div>
    );
  };
}

export default withModalBehavior;
