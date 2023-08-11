import * as React from 'react'

function ChatEntry() {
  const msgRef = React.useRef<HTMLInputElement>(null)
  return (
    <>
      <input type="text" ref={msgRef}></input>
    </>
  )
}

export default ChatEntry
