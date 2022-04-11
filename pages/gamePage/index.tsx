import * as React from 'react'
import { useAppContext } from '../../context/AppProvider'
import Link from 'next/link'
import Login from '../../components/DataTable/TableBody/Login'

function GamePage() {
  const { reducer } = useAppContext()

  const getGameObj = async () => {
    await reducer('getGameObject', {})
  }

  const setGameObj = async () => {
    const gameObj = {}
    await reducer('setGameObject', gameObj)
  }

  React.useEffect(() => {
  }, [])

  return (
    <div>
      <button onClick={getGameObj}>Get GameObj</button>
      <Link href="/table-test">
        <a>Go to the Table Page!!!</a>
      </Link>
      <Login></Login>
    </div>
  )
}

export default GamePage
