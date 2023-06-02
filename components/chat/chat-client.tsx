import { useRef, useEffect, useState, useCallback } from 'react'
import ChatHistory from './chat-history'
import { useAppContext } from '@context/app-provider'
import * as types from '../../types/rpg-types'
import MultiSelect from '@components/UI/MultiSelect'
import { getCurrentTimeString } from '@utils/utils'
import useWSManager from '@hooks/useWSManager'

function ChatClient() {
  const { game, myUser, users, setOutSocketMsg } = useAppContext()
  const msgRef = useRef<HTMLTextAreaElement>(null)
  const [recipient, setRecipient] = useState<string[]>([])
  const [options, setOptions] = useState<types.SelectionOption[]>([
    { label: 'Gamemaster', value: 'gm' },
    { label: 'All', value: 'all' },
    { label: 'Party', value: 'party' },
  ])

  useEffect(() => {
    console.log(game)
    console.log(users)
    if (!users) {
      console.log(`ChatClient useEffect: No game object loaded yet`)
      return
    }
    setOptions(prevOptions => {
      console.log(`ChatClient useEffect: setting Options for multiselect`)
      const newOptions = users
        .map(user => ({
          label: user,
          value: user,
        }))
        .filter(option => !prevOptions.find(o => o.value === option.value))
      console.log(`newOptions are ${newOptions}`)
      return [...prevOptions, ...newOptions]
    })
  }, [users])

  const sendChatMessage = () => {
    const textData = msgRef.current.value
    let msg: types.messageType = {
      id: 0.1,
      sender: myUser,
      timeStamp: getCurrentTimeString(), //Add Linux epoch time here instead
      type: 'groupText',
      data: textData,
      dest: recipient,
    }

    setOutSocketMsg(JSON.stringify(msg))
  }

  const handleMultiSelectChange = useCallback((selectedOptions: types.SelectionOption[]) => {
    const msgRecips = selectedOptions.map(option => option.value)
    setRecipient(msgRecips)
  }, [])
  return (
    <div id="chat-client">
      <MultiSelect
        options={options}
        onChange={handleMultiSelectChange}
        width={150}
        toggleHeight={20}
        title="Choose Recipients"
        fontSize="12px"
        grow={true}
      />
      <textarea
        style={{
          width: '100%',
          minHeight: '50px',
          resize: 'none',
        }}
        ref={msgRef}
      ></textarea>
      <button onClick={() => sendChatMessage()}>Send</button>
      <ChatHistory />
    </div>
  )
}
export default ChatClient
