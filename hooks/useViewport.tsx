import { useContext } from 'react'
import { useAppContext } from '../context/app-provider'

const useViewport = () => {
    /* useViewport hook pulls the width and height values from the App provider
     context*/
    const { devWidth, devHeight } = useAppContext();
    return { devWidth, devHeight };
  }

  export default useViewport