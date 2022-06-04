import '../styles/globals.css'
import '../styles/dashboard.css'
import * as React from 'react'
import type { AppProps } from 'next/app'
import { AppProvider } from '../context/AppProvider'
import { CSSReset, ChakraProvider } from '@chakra-ui/react'

interface InitialStateType {
  creatures: Array<Object>
  actors: Array<string>
  testMessage: Array<string>
}
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
    <ChakraProvider>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </ChakraProvider>
  )
}

export default MyApp
