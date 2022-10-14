import * as React from 'react'
import { useAppContext } from '../../context/app-provider'
import Link from 'next/link'
import Login from '../../components/data-table/table-body/login'
import ChatHistory from '../../components/chat/chat-history'

function GamePage() {
  React.useEffect(() => {}, [])

  return (
    <div>
      <Login />
    </div>
  )
}

export default GamePage
