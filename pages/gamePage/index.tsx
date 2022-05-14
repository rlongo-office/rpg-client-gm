import * as React from 'react'
import { useAppContext } from '../../context/AppProvider'
import Link from 'next/link'
import Login from '../../components/DataTable/TableBody/Login'
import ChatHistory from '../../components/Chat/ChatHistory'

function GamePage() {
  const { reducer,messages } = useAppContext()

  const getGameObj = async () => {
    await reducer('getGameObject', {})
  }

  const setGameObj = async () => {
    const gameObj = {}
    await reducer('setGameObject', gameObj)
  }

  React.useEffect(() => {}, [])

  return (
    <div>
      <button onClick={getGameObj}>Get GameObj</button>
      <Link href="/table-test">
        <a>Go to the Table Page!!!</a>
      </Link>
      <Login></Login>
      <ChatHistory></ChatHistory>
    </div>
  )
}

export default GamePage
