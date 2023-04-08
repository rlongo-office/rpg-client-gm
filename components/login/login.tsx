import useWSManager from '@hooks/useWSManager'
import React, { useState, useCallback, useEffect, useRef } from 'react'
import * as types from '../../types/rpg-types'

export const Login = () => {
  //Public API that will echo messages sent to it back to the client
  const msgRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const { sendOutboundMessage } = useWSManager('ws://localhost:8000')

  useEffect(() => {}, [])

  const handleClickSendMessage = () => {
    const user = msgRef.current.value
    const pass = passRef.current.value
    const msgData = JSON.stringify({ user: user, password: pass })
    const msg:types.messageType = {
        id:999999,
        sender: 'bob',
        timeStamp: '',
        type: 'login',
        data: msgData,
        dest: ["server"]
    }
    sendOutboundMessage(JSON.stringify(msg))
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span>User Name</span>
      <input type="text" ref={msgRef}></input>
      <span>Password</span>
      <input type="text" ref={passRef}></input>
      <button onClick={handleClickSendMessage}>Login</button>
    </div>
  )
}
