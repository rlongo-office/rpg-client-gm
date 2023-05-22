import useWSManager from '@hooks/useWSManager'
import React, { useState, useCallback, useEffect, useRef } from 'react'
import * as types from '../../types/rpg-types'
import { useAppContext } from '@context/app-provider'

export const Login = () => {
  const { game, } = useAppContext()
  const [recipient, setRecipient] = useState<types.SelectionOption[]>([])
  const [options, setOptions] = useState<types.SelectionOption[]>([
    { label: 'Gamemaster', value: 'gm' },
    { label: 'All', value: 'all' },
    { label: 'Party', value: 'party' },
  ])

  const userRef = useRef<HTMLInputElement>(null)
  const passRef = useRef<HTMLInputElement>(null)
  const { sendOutboundMessage } = useWSManager()

  const handleClickSendMessage = (msgType: string) => {
    let msg: types.messageType
    const user = userRef.current.value
    const pass = passRef.current.value
    //stringify the data because all data for our msgs must be a string for server side processing
    const msgData = JSON.stringify({ user: user, password: pass })
    msg = {
      id: 0.1,
      sender: user,
      timeStamp: '',
      type: 'login',
      data: msgData,
      dest: ['server'],
    }
    //Then we stringify the entire message and call the send to the Server
    sendOutboundMessage(JSON.stringify(msg))
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span>User Name</span>
      <input type="text" ref={userRef}></input>
      <span>Password</span>
      <input type="text" ref={passRef}></input>
      <button onClick={() => handleClickSendMessage('login')}>Login</button>
    </div>
  )
}
