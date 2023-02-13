import { useAppContext } from '@context/app-provider'
import * as React from 'react'
import useViewport from '../../hooks/useViewport'
import * as utils from '../../utils/utils'
import { mapImage } from 'data/mapImage'
import { ImageConfigType } from '@apptypes/rpg-types'

export default function UIWorldMap() {
  const { images, imgConfig } = useAppContext()
  const { devWidth, devHeight } = useViewport()
  let divRef = React.useRef<HTMLDivElement>(null)
  let imgRef = React.useRef<HTMLImageElement>(null)
  const [imgTop, setImgTop] = React.useState<number>(0)
  const [imgLeft, setImgLeft] = React.useState<number>(0)
  const [scHeight, setSCHeight] = React.useState<number>(100)
  const [scWidth, setSCWidth] = React.useState<number>(100)
  const [imgScale, setImgScale] = React.useState<number>(1)
  //natural Height and Width are the 'original' natural height, width of the image
  const [natHeight, setNatHeight] = React.useState<number>(100)
  const [natWidth, setNatWidth] = React.useState<number>(100)
  const [oldXCoord, setOldXCoord] = React.useState<number>(0)
  const [oldYCoord, setOldYCoord] = React.useState<number>(0)
  const [topLimit, setTopLimit] = React.useState<number>(0)
  const [leftLimit, setLeftLimit] = React.useState<number>(0)
  const [isScaling, setIsScaling] = React.useState<boolean>(false)
  const [isDragging, setIsDragging] = React.useState<boolean>(false)
  const [isFirstPress, setIsFirstPress] = React.useState<boolean>(false)
  const [accel, setAccel] = React.useState<number>(1)
  const [touchDist, setTouchDist] = React.useState<number>(0)
  const [cfg, setCfg] = React.useState<ImageConfigType>(utils.deepCopy(imgConfig))

  const setNewImageLimits = React.useCallback(() => {
    const img = imgRef
    let newTopLimit
    let newLeftLimit
    let newScaleHeight = img.current ? Math.round(img.current.getBoundingClientRect().height) : 0
    let newScaleWidth = img.current ? Math.round(img.current.getBoundingClientRect().width) : 0
    newTopLimit = newScaleHeight - cfg.divHeight
    newLeftLimit = newScaleWidth - cfg.divWidth
    setSCHeight(newScaleHeight)
    setSCWidth(newScaleWidth)
    setTopLimit(-newTopLimit)
    setLeftLimit(-newLeftLimit)
    setImgLeft(0)
    setImgTop(0)
  }, [cfg.divHeight, cfg.divWidth])

  const handleImageLoad = React.useCallback(() => {
    if (imgRef) {
      const img = imgRef
      let offsetLeft: number
      let offsetTop: number
      let heightLimit: number
      let widthLimit: number
      img.current ? (heightLimit = img.current.naturalHeight - cfg.divHeight) : (heightLimit = 0)
      img.current ? (widthLimit = img.current.naturalWidth - cfg.divWidth) : (widthLimit = 0)
      img.current ? (offsetLeft = img.current?.offsetLeft) : (offsetLeft = 0)
      img.current ? (offsetTop = img.current?.offsetTop) : (offsetTop = 0)
      setTopLimit(-heightLimit)
      setLeftLimit(-widthLimit)
      setNatHeight(img.current ? img.current.naturalHeight : 0)
      setNatWidth(img.current ? img.current.naturalWidth : 0)
      setSCHeight(img.current ? img.current.naturalHeight : 0)
      setSCWidth(img.current ? img.current.naturalWidth : 0)
      // TODO: make sure we don't need this line of code (look at ui-region-map.tsx and ui-tactical-map.tsx)
      // setCfg({ ...cfg, offsetX: offsetLeft, offsetY: offsetTop })
    }
  }, [cfg.divHeight, cfg.divWidth])

  // TODO: fix the lint error in the state array (second argument)
  React.useEffect(() => {
    if (imgRef.current?.complete) {
      handleImageLoad()
    }
  }, [handleImageLoad])

  // TODO: fix the lint error in the state array (second argument)
  React.useEffect(() => {
    setNewImageLimits()
  }, [setNewImageLimits])

  function distance(e: any) {
    let zw = e.touches[0].pageX - e.touches[1].pageX
    let zh = e.touches[0].pageY - e.touches[1].pageY
    if (zw * zw + zh * zh != 0) {
      return Math.sqrt(zw * zw + zh * zh)
    } else return 0
  }

  function getTransformOrigin() {
    let transformOriginX = 0
    let transformOriginY = 0
  }

  function setCoordinates(e: any) {
    let canMouseX: number = 0
    let canMouseY: number = 0
    let canMouseX1: number
    let canMouseY1: number
    let canMouseX2: number
    let canMouseY2: number
    if (e?.nativeEvent?.clientX && e?.nativeEvent?.clientY) {
      //console.log(e)
      //canMouseX = parseInt(e.clientX - cfg.offsetX)
      canMouseX = e.nativeEvent.clientX - cfg.offsetX
      canMouseY = e.nativeEvent.clientY - cfg.offsetY
      //console.log(`${canMouseX}:${canMouseY}`)
    } else if (e?.nativeEvent?.targetTouches) {
      canMouseX1 = e.nativeEvent.targetTouches.item(0)?.clientX - cfg.offsetX
      canMouseY1 = e.nativeEvent.targetTouches.item(0)?.clientY - cfg.offsetY
      if (e?.nativeEvent?.touches?.length > 1) {
        //To get the center of the 'pinch' we to 'average' the two points
        canMouseX2 = e.nativeEvent.targetTouches.item(1)?.clientX - cfg.offsetX
        canMouseY2 = e.nativeEvent.targetTouches.item(1)?.clientY - cfg.offsetY
        canMouseX = Math.round((canMouseX1 + canMouseX2) / 2)
        canMouseX = Math.round((canMouseY1 + canMouseY2) / 2)
      } else {
        canMouseX = canMouseX1
        canMouseY = canMouseY1
      }
      // This isn't doing anything (noticeable)
      // e.preventDefault();
    }
    return {
      canMouseX,
      canMouseY,
    }
  }

  const handleMouseUp = (e: any) => {
    setIsScaling(false)
    setIsDragging(false)
    setAccel(1)
    setTouchDist(0)
    console.log('Mouse UP Event function')
  }

  const handleMouseDown = (e: any) => {
    console.log(e)
    const { canMouseX, canMouseY } = setCoordinates(e)
    e.preventDefault()
    canMouseX ? setOldXCoord(canMouseX) : setOldXCoord(0)
    canMouseY ? setOldYCoord(canMouseY) : setOldYCoord(0)
    setIsDragging(true)
    if (e?.targetTouches) {
      if (e?.nativeEvent?.touches?.length > 1) {
        // detected a pinch
        setTouchDist(distance(e))
        setIsScaling(true)
        setIsDragging(false)
      } else {
        // set the drag flag
        setIsScaling(false)
        setIsDragging(true)
      }
    }
  }

  const handleDoubleClick = (e: any) => {
    let tempScale
    if (imgScale > 3) {
      tempScale = 1
    } else {
      tempScale = imgScale + 0.5
    }
    setImgScale(tempScale)
    setNewImageLimits()
  }

  const handleMouseMove = (e: any) => {
    let scaling = isScaling
    let tempImgScale: number = 1
    let tempLeft = 0
    let tempTop = 0
    const { canMouseX, canMouseY } = setCoordinates(e)

    let scalediff = cfg.scaleInc
    let yDiff: number
    let xDiff: number
    let newScaleHeight
    let newScaleWidth
    let newLeftLimit
    let newTopLimit

    if (scaling) {
      let dist = distance(e)
      if (dist < touchDist) {
        scalediff = -scalediff
      }
      tempImgScale = imgScale + scalediff
      if (tempImgScale < 1) tempImgScale = 1 //for now no scaling down allowed...
      setImgScale(tempImgScale)
      setNewImageLimits()
      //changing scale should fire a rerender because of useEffect
      setTouchDist(dist)
    }

    // if the drag flag is set, clear the canvas and draw the image
    if (isDragging) {
      console.log(imgRef)
      yDiff = canMouseY && oldYCoord ? accel * (canMouseY - oldYCoord) : 0
      xDiff = canMouseX && oldXCoord ? accel * (canMouseX - oldXCoord) : 0
      if (imgLeft + xDiff <= leftLimit) {
        setImgLeft(leftLimit)
      } else if (imgLeft + xDiff >= 0) {
        setImgLeft(0)
      } else setImgLeft(imgLeft + xDiff)
      if (imgTop + yDiff <= topLimit) {
        setImgTop(topLimit)
      } else if (imgTop + yDiff >= 0) {
        setImgTop(0)
      } else setImgTop(imgTop + yDiff)

      if (accel < cfg.accLimit) {
        setAccel(accel + 1)
      }
    }
    //console.log('Mouse **MOVE Event function')
    setOldXCoord(canMouseX || 0)
    setOldYCoord(canMouseY || 0)
  }
  const handleMouseLeave = () => {
    setIsScaling(false)
    setIsDragging(false)
    setIsFirstPress(true)
    setAccel(1)
    setTouchDist(0)
    console.log('Mouse LEAVE Event function')
  }
  const moveLeft = () => {
    console.log(`Image scale for moveleft is: ${imgScale}`)
    /*     let xDiff = -50/imgScale
    console.log(`xdiff is : ${xDiff}`)
    if (imgLeft + xDiff <= leftLimit) {
      setImgLeft(leftLimit)
    } else if (imgLeft + xDiff >= 0) {
      setImgLeft(0)
    } else setImgLeft(imgLeft + xDiff) */
    setImgLeft(-2084)
  }

  const moveTop = () => {
    let yDiff = -50 * imgScale
    if (imgTop + yDiff <= topLimit) {
      setImgTop(topLimit)
    } else if (imgTop + yDiff >= 0) {
      setImgTop(0)
    } else setImgTop(imgTop + yDiff)
  }

  return (
    <div style={{ padding: '15px' }}>
      <div
        style={{
          overflow: 'hidden',
          height: '350px',
          width: '350px',
          touchAction: 'none',
        }}
      >
        <div
          ref={divRef}
          style={{ overflow: 'hidden', height: '350px', width: '350px', touchAction: 'none' }}
        >
          {/*eslint-disable-next-line @next/next/no-img-element*/}
          <img
            alt="world-map"
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchEnd={handleMouseUp}
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
            onTouchMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onDoubleClick={handleDoubleClick}
            ref={imgRef}
            src={`data:image/jpeg;base64,${mapImage}`}
            style={{
              transform: `translate(${imgLeft}px, ${imgTop}px)`,
              transformOrigin: 'top left',
              width: `2434px`,
              height: `1544px`,
            }}
            onLoad={handleImageLoad}
          />
        </div>
      </div>
      <span>
        <b>{`World map scale: ${imgScale}  `}</b>
      </span>
      <span>
        <b>{`Dist: ${touchDist}  `}</b>
      </span>
      <span>
        <b>{`curH: ${scHeight}  `}</b>
      </span>
      <span>
        <b>{`curW: ${scWidth}  `}</b>
      </span>
      <span>
        <b>{`imgL: ${imgLeft}  `}</b>
      </span>
      <span>
        <b>{`imgT: ${imgTop}  `}</b>
      </span>
      <span>
        <b>{`limL: ${leftLimit}  `}</b>
      </span>
      <span>
        <b>{`limT: ${topLimit}  `}</b>
      </span>
      <button
        style={{ width: 40, height: 20, backgroundColor: `blue` }}
        onClick={moveLeft}
      ></button>
      <button
        style={{ width: 40, height: 20, backgroundColor: `orange` }}
        onClick={moveTop}
      ></button>
    </div>
  )
}

//objectPosition: `${imgLeft}px ${imgTop}px`,
//transform: `scale(${imgScale}) translate(${imgLeft}px, ${imgTop}px)`,
