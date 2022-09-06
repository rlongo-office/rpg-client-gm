import * as React from 'react'
import { useAppContext } from '../../context/app-provider'
import UISection from './ui-section'

function UIParent() {
  const { playerBP } = useAppContext()
  return <UISection {...playerBP.top} />
}

export default UIParent
