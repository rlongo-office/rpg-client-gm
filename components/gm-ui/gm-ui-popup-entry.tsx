import * as REact from 'react'

type props = {}

function GMUIPopupEntry(props: any) {
  return props.trigger ? (
    <div
      id="popup"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.2)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        id="popup-inner"
        style={{
          padding: '32px',
          backgroundColor: '#FFF',
        }}
      >
        <button id="close-btn" onClick={() => props.setTrigger(false)}>
          close
        </button>
        {props.children}
      </div>
    </div>
  ) : (
    <></>
  )
}

export default GMUIPopupEntry
