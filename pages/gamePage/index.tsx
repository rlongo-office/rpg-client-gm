import * as React from 'react'
import { useAppContext } from '../../context/AppProvider'
import Link from 'next/link'
import Login from '../../components/DataTable/TableBody/Login'
import ChatHistory from '../../components/Chat/ChatHistory'

function GamePage() {


  React.useEffect(() => {}, [])

  return (
    <div>
      <Link href="/table-test">
        <a>Go to the Table Page!!!</a>
      </Link>
      <Login/>
      <ChatHistory/>
    </div>
  )
}

export default GamePage
