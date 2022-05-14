import * as React from 'react'
import { useAppContext } from '../../../context/AppProvider'
import * as types from '../../../types/rpg-types'
import CustomImage from '../../ImageDisplay/CustomImage'
import JRiceMapImage from '../../ImageDisplay/JRiceMapImage'
import TestMouseImage from '../../ImageDisplay/TestMouseImage'
import MyMapTest from '../../ImageDisplay/MyMapTest'
import * as vars from '../../../data/mapImage'
import Chat from '../../Chat/Chat'
function Login() {
  //Note that reference type must correspond to the HTML element it references, e.g. HTMLInputELement
  const { user, setUser,isConnected,setIsConnected } = useAppContext()
  const userRef = React.useRef<HTMLInputElement>(null)
  const passwordRef = React.useRef<HTMLInputElement>(null)

  function login(event: any) {
    const obj = {
      name: userRef?.current?.value || '',
      password: passwordRef?.current?.value || '',
    }
    console.log(obj)
    setUser(obj)
    setIsConnected(true)
  }

  React.useEffect(() => {
    //Does this rerender whenever user value changes?
  }, [user])

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
      <MyMapTest source={vars.bigImage} />
      {isConnected &&
      <Chat
      name={user.name}
      password={user.password}
      />
      }
    </div>
  )
}

export default Login
