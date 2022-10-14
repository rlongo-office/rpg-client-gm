import * as React from 'react'
import { useAppContext } from '../../context/app-provider'
import Link from 'next/link'
import Login from '../../components/data-table/table-body/login'

function Dashboard() {
  const { reducer, messages, game } = useAppContext()

  React.useEffect(() => {}, [])

  return (
    <div className="dashboard">
      <div className="dashboardHeader"></div>
      <div className="dashboardParty">
      </div>
      <div className="dashboardEnvironment"></div>
      <div className="dashboardImage"></div>
      <div className="dashboardMessage"></div>
    </div>
  )
}

export default Dashboard
