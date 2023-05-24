import '../styles/globals.css'
import '../styles/dashboard.css'
import * as React from 'react'
import type { AppProps } from 'next/app'
import { AppProvider } from '../context/app-provider'

/*
interface AppContextType{
  state:InitialStateType,
  dispatch:Function
}

type AppProviderProps = {
  children: React.ReactNode
}
*/

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  )
}

export default MyApp
