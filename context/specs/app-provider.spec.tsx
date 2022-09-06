import * as React from 'react'
import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AppProvider, useAppContext } from '../app-provider'

//import { AppProvider, Payload, useAppContext } from '../index'

function TestApp() {
  const store = useAppContext()

  // Normally you wouldn't want to do this but this is sufficient for the test case:
  return <div>This code has access to the context store: {JSON.stringify(store)}</div>
}

function TestPage() {
  return <div>Our app:</div>
}

describe('AppProvider', () => {
  it('store to throw an exception since the context has not be exposed', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {})

    // This will trigger an exception
    expect(() => render(<TestApp />)).toThrow('Store is not defined')
  })

  it('store to not throw an exception once the context provider is set', () => {
    screen.logTestingPlaygroundURL()
    expect(() => {
      return render(
        <AppProvider>
          <TestApp />
        </AppProvider>
      )
    }).not.toThrow('store is not defined')
  })
})
