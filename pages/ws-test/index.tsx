import { WebSocketDemo } from '@components/WebSocketDemo'
import useViewport from '@hooks/useViewport'
import { styleObj } from '@styles/styles'

function WsTest() {
  const { devWidth, devHeight } = useViewport()
  return (
    <div style={{height: `${devHeight}px`, width: `${devWidth}px` }}>
      <WebSocketDemo></WebSocketDemo>
    </div>
  )
}

export default WsTest
