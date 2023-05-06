import { useRef, useEffect, useState } from 'react'
import ChatRecipients from './chat-recipients'
import ChatHistory from './chat-history'
import ChatEntry from './chat-entry'
import { useAppContext } from '@context/app-provider'
import useWSManager from '@hooks/useWSManager'
import * as types from '../../types/rpg-types'
import MultiSelect from '@components/UI/MultiSelect'

function ChatClient() {
  const { game } = useAppContext()
  const msgRef = useRef<HTMLTextAreaElement>(null)
  const [recipient, setRecipient] = useState<types.SelectionOption[]>([])
  const [options, setOptions] = useState<types.SelectionOption[]>([
    { label: 'Gamemaster', value: 'gm' },
    { label: 'All', value: 'all' },
    { label: 'Party', value: 'party' },
  ])

  useEffect(() => {
    if (!game || !game.players) {
      return;
    }
    setOptions(prevOptions => {
      const newOptions = game.players.map((player) => ({
        label: player.name,
        value: player.name,
      })).filter((option) => !prevOptions.find((o) => o.value === option.value));
      console.log(newOptions);
      return [...prevOptions, ...newOptions];
    });
  }, [game]);

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
