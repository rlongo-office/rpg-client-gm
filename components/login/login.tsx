import useWSManager from '@hooks/useWSManager'
import React, { useState, useCallback, useEffect, useRef } from 'react'
import * as types from '../../types/rpg-types'
import MultiSelectSimple from '@components/UI/MultiSelectSimple'
import MultiSelect from '@components/UI/MultiSelect'
import { useAppContext } from '@context/app-provider'

interface Option {
  label: string
  value: string
}

export const Login = () => {
  const { game } = useAppContext()
  const [recipient, setRecipient] = useState<types.SelectionOption[]>([])
  const [options, setOptions] = useState<types.SelectionOption[]>([
    { label: 'Gamemaster', value: 'gm' },
    { label: 'All', value: 'all' },
    { label: 'Party', value: 'party' },
  ])

  const userRef = useRef<HTMLInputElement>(null)
  const passRef = useRef<HTMLInputElement>(null)
  const { sendOutboundMessage } = useWSManager('ws://localhost:8000')

  const [selectedOptions, setSelectedOptions] = useState<Option[]>([])

  const handleMultiSelectChange = (selectedOptions: Option[]) => {
    setSelectedOptions(selectedOptions)
    console.log(selectedOptions)
  }

  const handleClickSendMessage = (msgType: string) => {
    let msg: types.messageType
    switch (msgType) {
      case 'login':
        const user = userRef.current.value
        const pass = passRef.current.value
        const msgData = JSON.stringify({ user: user, password: pass })
        msg = {
          id: 999999,
          sender: 'bob',
          timeStamp: '',
          type: 'login',
          data: msgData,
          dest: ['server'],
        }
        break
      case 'game-update':
        msg = {
          id: 999999,
          sender: 'bob',
          timeStamp: '',
          type: 'gameUpdate',
          data: 'update that game!!',
          dest: ['server'],
        }
        break
    }
    sendOutboundMessage(JSON.stringify(msg))
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span>User Name</span>
      <input type="text" ref={userRef}></input>
      <span>Password</span>
      <input type="text" ref={passRef}></input>
      <button onClick={() => handleClickSendMessage('login')}>Login</button>
      <button onClick={() => handleClickSendMessage('game-update')}>GameUpdate</button>
      <MultiSelect options={options} onChange={handleMultiSelectChange} />
      <p>Selected options: {selectedOptions.map(option => option.label).join(', ')}</p>
    </div>
  )
}
