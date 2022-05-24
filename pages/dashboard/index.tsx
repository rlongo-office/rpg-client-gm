import * as React from 'react'
import { useAppContext } from '../../context/AppProvider'
import Link from 'next/link'
import Login from '../../components/DataTable/TableBody/Login'
import Party from '../../components/Party/Party'

function Dashboard() {
  const { reducer, messages, game } = useAppContext()

  React.useEffect(() => {}, [])

  return (
    <div className="dashboard">
      <div className="dashboardHeader"></div>
      <div className="dashboardParty">
        <Party></Party>
      </div>
      <div className="dashboardEnvironment"></div>
      <div className="dashboardImage"></div>
      <div className="dashboardMessage"></div>
    </div>
  )
}

export default Dashboard
