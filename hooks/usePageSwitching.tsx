import { useRouter } from 'next/router'
import { useEffect } from 'react'

export function usePageSwitching(pagePath: string) {
  const router = useRouter()

  useEffect(() => {
    const switchPage = () => {
        router.push(pagePath, undefined, { shallow: true });
    }

    switchPage()

    // Clean up the event listener when the component unmounts
    return () => {
      router.events.off('routeChangeComplete', switchPage)
    }
  }, [pagePath, router])

  // You can return any additional data or functions you need
  return {
    router,
  }
}