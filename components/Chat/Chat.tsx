import * as React from 'react'
import useStomp from '../../hooks/useJRStomp'
import * as types from '../../types/rpg-types'
import { useAppContext } from '../../context/AppProvider'
import useJRStomp from "../../hooks/useJRStomp";

const Chat = (name: any, password: any) => {
  const [outboundMsg, setOutboundMsg] = React.useState('')
  const { user } = useAppContext()
  const { sendMessage } = useJRStomp()


  const sendChatMessage = () => {
    let msg: types.messageType = {
      id: Math.floor(Math.random() * 10000),
      sender: user.name,
      timeStamp: '',
      type: 'private',
      body: outboundMsg,
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
        onChange={e => setOutboundMsg(e.target.value)}
      />
      <button onClick={sendChatMessage}>Send Message</button>
    </div>
  )
}

export default Chat
