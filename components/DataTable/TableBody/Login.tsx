import * as React from 'react'
import { useAppContext } from '../../../context/AppProvider'
import {wstools} from '../../../utils/web-socket-service'

function Login() {
  //Note that reference type must correspond to the HTML element it references, e.g. HTMLInputELement
  const { account, setAccount } = useAppContext()
  const userRef = React.useRef<HTMLInputElement>(null)
  const passwordRef = React.useRef<HTMLInputElement>(null)

  function login(event: any) {
    const obj = { 
        user: userRef?.current?.value || '', 
        password: passwordRef?.current?.value || ''
    }

    setAccount(obj)
    wstools.connect(obj.user, obj.password)
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
    </div>
  )
}

export default Login
