import { useAppEventContext } from '@context/app-event-provider'
import { useAppContext } from '@context/app-provider'
import { useEffect, useState, useCallback } from 'react'

const useWSManager = () => {
  const { serverURL, setAppSocket, appSocket, setIsConnected } = useAppContext()
  const { addToInboundQueue } = useAppEventContext()

  const init = () => {
    if (!appSocket) {
      const socket = new WebSocket(serverURL)
      socket.onopen = () => setIsConnected(true)
      socket.onclose = () => setIsConnected(false)
      socket.onmessage = event => addToInboundQueue(event.data)
      setAppSocket(socket)
    } else {
      if (appSocket.onmessage) {
        appSocket.onmessage = null
      }
      appSocket.onmessage = event => addToInboundQueue(event.data)
    }
  }

  useEffect(() => {
    if (!appSocket) {
      const socket = new WebSocket(serverURL)
      socket.onopen = () => setIsConnected(true)
      socket.onclose = () => setIsConnected(false)
      socket.onmessage = event => addToInboundQueue(event.data)
      setAppSocket(socket) // this will rerender hook
    } else {
      if (appSocket) {
        /*REMOVE THE EXISTING ONMESSAGE HANDLER, BUT TEST IF IT EXISTS */
        if (appSocket.onmessage) {
          appSocket.onmessage = null // Remove the existing onmessage handler
        }
        appSocket.onmessage = event => addToInboundQueue(event.data)
      }
    }
  }, [appSocket])

  const testFunc = () => {
    if (appSocket) {
      console.log('Hello from the hook - socket is set')
    } else console.log('Hello from the hook - socket is NOT set!!')
  }

  const sendOutboundMessage = useCallback(
    msg => {
      if (appSocket) {
        appSocket.send(msg)
      } else {
        console.log('Socket is not available')
      }
    },
    [appSocket]
  )

  return { sendOutboundMessage, init, testFunc }
}

export default useWSManager
