import { useRef, useEffect, useState } from 'react'
import ChatRecipients from './chat-recipients'
import ChatHistory from './chat-history'
import ChatEntry from './chat-entry'
import { useAppContext } from '@context/app-provider'
import useWSManager from '@hooks/useWSManager'
import * as types from '../../types/rpg-types'
import MultiSelect from '@components/UI/MultiSelect'

function ChatClient() {
  const { gameObject } = useAppContext()
  const msgRef = useRef<HTMLInputElement>(null)
  const [recipient, setRecipient] = useState<types.SelectionOption[]>([])
  const [options, setOptions] = useState<types.SelectionOption[]>([
    { label: 'Bobby', value: 'bobby' },
    { label: 'Johnny', value: 'johnny' },
    { label: 'Mikey', value: 'mikey' },
  ])

  useEffect(() => {}, [])

  const sendChatMessage = () => {
    let msg: types.messageType = {
      id: 0,
      sender: '',
      timeStamp: '',
      type: '',
      data: '',
      dest: [],
    }
  }

  function handleMultiSelectChange(selectedOptions: types.SelectionOption[]): void {
    setRecipient(selectedOptions)
    console.log(selectedOptions)
  }

  return (
    <div id="chat-client">
      <MultiSelect options={options} onChange={handleMultiSelectChange} />
      <input type="text" ref={msgRef}></input>
      <button onClick={() => sendChatMessage()}>Login</button>
      <ChatHistory />
    </div>
  )
}

export default ChatClient
