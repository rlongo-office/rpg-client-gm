import * as React from 'react'
import useViewport from '../../hooks/useViewport'
import { styleObj } from '../../styles/styles'
import useStomp from '../../hooks/useStomp'
import { useRouter } from 'next/router'
import { useAppContext } from '../../context/app-provider'

function LoginPage() {
  const { devWidth, devHeight } = useViewport()
  const { isConnected } = useAppContext()
  const { connect } = useStomp()
  const router = useRouter()
  const userRef = React.useRef<HTMLInputElement>(null)
  const passRef = React.useRef<HTMLInputElement>(null)
  const inputStyle = {
    width: devWidth / 3,
    height: `20px`,
    padding: '10px',
  }

  function routeToPLayer() {
    router.push('player-sheet')
  }

  React.useEffect(() => {
    if (isConnected) {
      routeToPLayer()
    }
  }, [isConnected])

  const loginToServer = () => {
    if (userRef.current && passRef.current) {
      const user = userRef.current.value
      const pass = passRef.current.value
      connect(user, pass)
    }
  }

  return (
    <div style={{ ...styleObj[`TopFlexPage`], height: `${devHeight}px`, width: `${devWidth}px` }}>
      <div style={{ ...styleObj[`HSpaced`], marginTop: devHeight / 3 }}>
        <input ref={userRef} id="name" type="text" style={{ ...inputStyle }}></input>
        <input ref={passRef} id="password" type="text" style={{ ...inputStyle }}></input>
        <button onClick={loginToServer}>login</button>
      </div>
    </div>
  )
}

export default LoginPage
