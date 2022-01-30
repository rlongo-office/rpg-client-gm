import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {AppWrapper} from '../state/gameState'
import {useState} from 'react'


function MyApp({ Component, pageProps }: AppProps) {

  return (
          <AppWrapper>
            <Component {...pageProps} />
          </AppWrapper>
          )
}

export default MyApp
