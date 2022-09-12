import * as React from 'react'
import { useAppContext } from '../../context/app-provider'
import Link from 'next/link'
import Login from '../../components/data-table/table-body/login'
import ChatHistory from '../../components/chat/chat-history'

function GamePage() {
  React.useEffect(() => {}, [])

  return (
    <div>
      <Link href="/table-test">
        <a>Go to the Table Page!!!</a>
      </Link>
      <Login />
      <ChatHistory />
    </div>
  )
}

export default GamePage
