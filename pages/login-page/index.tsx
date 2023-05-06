import { Login } from '@components/login/login'
import useViewport from '@hooks/useViewport'

function LoginPage() {
  
  const { devWidth, devHeight } = useViewport()
  return (
    <div style={{height: `${devHeight}px`, width: `${devWidth}px` }}>
      <Login></Login>
    </div>
  )
}

export default LoginPage