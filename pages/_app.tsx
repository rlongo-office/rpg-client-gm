import '../styles/globals.css'
import * as React from 'react'
import type { AppProps } from 'next/app'
import {appReducer,initialState,AppContext,AppProvider} from '../context/AppProvider'

interface InitialStateType{
  creatures: Array<Object>,
  actors:Array<string>
  testMessage:Array<string>
}

interface AppContextType{
  state:InitialStateType,
  dispatch:Function
}

type AppProviderProps = {
  children: React.ReactNode
}

function MyApp({ Component, pageProps }: AppProps) {

  return (
          <AppProvider>
            <Component {...pageProps} />
          </AppProvider>
          )
}

export default MyApp
