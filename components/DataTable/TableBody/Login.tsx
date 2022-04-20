import * as React from 'react'
import { useAppContext } from '../../../context/AppProvider'
import * as types from '../../../types/rpg-types'
import CustomImage from '../../ImageDisplay/CustomImage'



function Login() {
  //Note that reference type must correspond to the HTML element it references, e.g. HTMLInputELement
  const { account, setAccount, connect, sendMessage } = useAppContext()
  const userRef = React.useRef<HTMLInputElement>(null)
  const passwordRef = React.useRef<HTMLInputElement>(null)

  function login(event: any) {
    const obj = {
      user: userRef?.current?.value || '',
      password: passwordRef?.current?.value || '',
    }

    setAccount(obj)
    connect(obj.user, obj.password)
  }

  const sendChatMessage = () => {
    let msg: types.messageType = {
      id: Math.floor(Math.random() * 10000),
      sender: account.user,
      timeStamp:'',
      type: 'private',
      body: 'Hi this is a test group message',
      dest: ['bob'],
    }
    sendMessage(msg)
  }

  React.useEffect(() => {}, [])

  return (
    <div>
      <input
        type="text"
        name="userInput"
        className=""
        //value=""
        ref={userRef}
      />
      <input
        type="text"
        name="passwordInput"
        className=""
        //value=""
        ref={passwordRef}
      />
      <button onClick={login}>Login</button>
      <button onClick={sendChatMessage}>Send Message</button>
      <CustomImage/>
    </div>
  )
}

export default Login
