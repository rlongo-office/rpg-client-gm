import * as React from 'react'
import MyMapTest from '../../Image/my-map-test'
import * as vars from '../../../data/mapImage'
import Chat from '@components/chat/chat-client-old'
import { useAppContext } from '@context/app-provider'
import useStomp from '@hooks/useStomp'

function Login() {
  // Note that reference type must correspond to the HTML element it references, e.g. HTMLInputELement
  const { account, setAccount, isConnected, setIsConnected } = useAppContext()
  const userRef = React.useRef<HTMLInputElement>(null)
  const passwordRef = React.useRef<HTMLInputElement>(null)
  const { connect } = useStomp()

  function login(event: any) {
    const obj = {
      user: userRef?.current?.value || '',
      password: passwordRef?.current?.value || '',
    }
    console.log(obj)
    setAccount(obj)
    setIsConnected(true)
    connect(obj.user, obj.password)
  }

  return (
    <div>
      <input type="text" name="userInput" className="" ref={userRef} />
      <input type="text" name="passwordInput" className="" ref={passwordRef} />
      <button onClick={login}>Login</button>
      <MyMapTest />
      {isConnected && <Chat name={account.name} password={account.password} />}
    </div>
  )
}

export default Login
