import * as React from 'react'
import * as types from '../../types/rpg-types'
import { useAppContext } from '../../context/app-provider'
import useStomp from '../../hooks/use.stomp'

const Chat = (name: any, password: any) => {
  const [outboundMsg, setOutboundMsg] = React.useState('')
  const [recipient, setRecipient] = React.useState('')
  const { account } = useAppContext()
  const { sendMessage } = useStomp()

  const sendChatMessage = () => {
    let msg: types.messageType = {
      id: Math.floor(Math.random() * 10000),
      sender: account.name,
      timeStamp: '',
      type: 'private',
      data: outboundMsg,
      dest: [recipient],
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
      <input
        type="text"
        name="recipientText"
        className="tableInput"
        onChange={e => setRecipient(e.target.value)}
      />
      <button onClick={sendChatMessage}>Send Message</button>
    </div>
  )
}

export default Chat
