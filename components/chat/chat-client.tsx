import { useRef, useEffect, useState } from 'react'
import ChatHistory from './chat-history'
import { useAppContext } from '@context/app-provider'
import * as types from '../../types/rpg-types'
import MultiSelect from '@components/UI/MultiSelect'
import { getCurrentTimeString } from '@utils/utils'
import sendOutboundMessage from "@hooks/useWSManager";

function ChatClient() {
  const { game, myUser } = useAppContext()
  const msgRef = useRef<HTMLTextAreaElement>(null)
  const [recipient, setRecipient] = useState<string[]>([])
  const [options, setOptions] = useState<types.SelectionOption[]>([
    { label: 'Gamemaster', value: 'gm' },
    { label: 'All', value: 'all' },
    { label: 'Party', value: 'party' },
  ])

  useEffect(() => {
    if (!game || !game.players) {
      return
    }
    setOptions(prevOptions => {
      const newOptions = game.players
        .map(player => ({
          label: player.name,
          value: player.name,
        }))
        .filter(option => !prevOptions.find(o => o.value === option.value))
      console.log(newOptions)
      return [...prevOptions, ...newOptions]
    })
  }, [game])

  const sendChatMessage = () => {
    const textData = msgRef.current.value
    let msg: types.messageType = {
      id: 0.1,
      sender: myUser,
      timeStamp: getCurrentTimeString(),
      type: 'groupText',
      data: textData,
      dest: recipient,
    }
    
    sendOutboundMessage(JSON.stringify(msg))
  }

  function handleMultiSelectChange(selectedOptions: types.SelectionOption[]): void {
    const msgRecips = selectedOptions.map(option => option.value)
    setRecipient(msgRecips)
  }
  return (
    <div id="chat-client">
      <MultiSelect
        options={options}
        onChange={handleMultiSelectChange}
        width={150}
        toggleHeight={20}
        title="Choose Recipients"
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
