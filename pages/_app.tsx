import '../styles/globals.css'
import '../styles/dashboard.css'
import * as React from 'react'
import type { AppProps } from 'next/app'
import { AppProvider } from '../context/app-provider'
import { AppEventProvider } from '../context/app-event-provider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <AppEventProvider>
        <Component {...pageProps} />
      </AppEventProvider>
    </AppProvider>
  )
}

export default MyApp

/*
interface AppContextType{
  state:InitialStateType,
  dispatch:Function
}

type AppProviderProps = {
  children: React.ReactNode
}
*/
