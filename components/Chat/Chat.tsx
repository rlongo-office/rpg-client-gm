import * as React from 'react'
import useStomp from '../../hooks/useJRStomp'
import * as types from '../../types/rpg-types'
import { useAppContext } from '../../context/AppProvider'

const Chat = (name: any, password: any) => {
  const { user, setUser } = useAppContext()
  const { sendMessage } = useStomp()

  const sendChatMessage = () => {
    let msg: types.messageType = {
      id: Math.floor(Math.random() * 10000),
      sender: user.name,
      timeStamp: '',
      type: 'private',
      body: 'Hi this is a private message',
      dest: ['bob'],
    }
    sendMessage(msg)
  }

  return (
    <div>
      <span>Chat Component</span>
      <input
        type="text"
        name="messageText"
        className="tableInput"
        //value="Test Message"
      ></input>
      <button onClick={sendChatMessage}>Send Message</button>
    </div>
  )
}

export default Chat
