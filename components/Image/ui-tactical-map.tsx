import { mapImage } from 'data/mapImage'
import * as React from 'react'
import { useAppContext } from '@context/app-provider'
import * as uiTypes from '../../types/blue-print'
import * as rpgTypes from '../../types/rpg-types'
import * as utils from '../../utils/utils'

export default function UITacticalMap({ section }: { section: uiTypes.UISectionObj }) {
  const { images, imgConfig } = useAppContext()
  let divRef = React.useRef<HTMLDivElement>(null)
  let imgRef = React.useRef<HTMLImageElement>(null)
  const [imgTop, setImgTop] = React.useState<number>(0)
  const [imgLeft, setImgLeft] = React.useState<number>(0)
  const [scHeight, setSCHeight] = React.useState<number>(100)
  const [scWidth, setSCWidth] = React.useState<number>(100)
  const [imgScale, setImgScale] = React.useState<number>(1)
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
  const [cfg, setCfg] = React.useState<rpgTypes.ImageConfig>(utils.deepCopy(imgConfig))

  const setNewImageLimits = React.useCallback(() => {
    const img = imgRef
    let scaleHeight: number
    let scaleWidth: number
    console.log(`imgScale is: ${imgScale}`)
    //console.log(`current offsets: ${imgLeft}:${imgTop}`)
    console.log(`img width/Height: ${img.current?.width}:${img.current?.height}`)
    console.log(img)
    img.current
      ? (scaleHeight = Math.floor(imgScale * img.current.naturalHeight))
      : (scaleHeight = 0)
    img.current ? (scaleWidth = Math.floor(imgScale * img.current.naturalWidth)) : (scaleWidth = 0)
    setTopLimit(-(scaleHeight - cfg.divHeight))
    setLeftLimit(-(scaleWidth - cfg.divWidth))
    setImgLeft(0)
    setSCHeight(scaleHeight)
    setSCWidth(scaleWidth)
    setImgTop(0)
  }, [cfg.divHeight, cfg.divWidth, imgScale])

  const handleImageLoad = React.useCallback(() => {
    if (imgRef) {
      const img = imgRef
      let heightLimit: number
      let widthLimit: number
      img.current ? (heightLimit = img.current.naturalHeight - cfg.divHeight) : (heightLimit = 0)
      img.current ? (widthLimit = img.current.naturalWidth - cfg.divWidth) : (widthLimit = 0)
      setTopLimit(-heightLimit)
      setLeftLimit(-widthLimit)
      setNatHeight(img.current ? img.current.naturalHeight : 0)
      setNatWidth(img.current ? img.current.naturalWidth : 0)
      setSCHeight(img.current ? img.current.naturalHeight : 0)
      setSCWidth(img.current ? img.current.naturalWidth : 0)
      console.log('Image Loaded with topLimit:' + heightLimit + ' and leftLimit:' + widthLimit)
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
    console.log(`imgScale is: ${imgScale}`)
  }, [imgScale, setNewImageLimits])

  function distance(e: any) {
    let zw = e.touches[0].pageX - e.touches[1].pageX
    let zh = e.touches[0].pageY - e.touches[1].pageY
    if (zw * zw + zh * zh != 0) {
      return Math.sqrt(zw * zw + zh * zh)
    } else return 0
  }

  function setCoordinates(e: any) {
    let canMouseX: number
    let canMouseY: number

    if (e?.nativeEvent?.clientX && e?.nativeEvent?.clientY) {
      //console.log(e)
      //canMouseX = parseInt(e.clientX - cfg.offsetX)
      canMouseX = e.nativeEvent.clientX - cfg.offsetX
      canMouseY = e.nativeEvent.clientY - cfg.offsetY
      //console.log(`${canMouseX}:${canMouseY}`)
    } else if (e?.nativeEvent?.targetTouches) {
      canMouseX = e.nativeEvent.targetTouches.item(0)?.clientX - cfg.offsetX
      canMouseY = e.nativeEvent.targetTouches.item(0)?.clientY - cfg.offsetY
      // This isn't doing anything (noticeable)
      // e.preventDefault();
    } else return {}
    return {
      canMouseX,
      canMouseY,
    }
  }

  const handleMouseUp = (e: any) => {
    setIsScaling(false)
    setIsDragging(false)
    setIsFirstPress(true)
    setAccel(1)
    console.log('Mouse UP Event function')
  }
  const handleMouseDown = (e: any) => {
    const { canMouseX, canMouseY } = setCoordinates(e)
    e.preventDefault()
    canMouseX ? setOldXCoord(canMouseX) : setOldXCoord(0)
    canMouseY ? setOldYCoord(canMouseY) : setOldYCoord(0)
    setIsDragging(true)
    setCfg({ ...cfg, isDragging: true })
    if (e?.targetTouches) {
      e.preventDefault()
      if (e?.nativeEvent?.touches?.length > 1) {
        // detected a pinch
        setTouchDist(distance(e))
        setCfg({ ...cfg, touchDist: distance(e), isScaling: true })
        setIsScaling(true)
        setIsDragging(false)
      } else {
        // set the drag flag
        setIsScaling(false)
        setIsDragging(true)
      }
    }
    setIsFirstPress(false)
    setCfg({ ...cfg, isFirstPress: true })
  }

  const handleDoubleClick = (e: any) => {
    const { canMouseX, canMouseY } = setCoordinates(e)
    if (imgScale === 3) {
      setImgScale(1)
    } else {
      let scaleHeight = Math.floor(natHeight * (imgScale + 0.5))
      let scaleWidth = Math.floor(natWidth * (imgScale + 0.5))
      setImgScale(imgScale + 0.5)
      setSCHeight(scaleHeight)
      setSCWidth(scaleWidth)
    }
  }

  const handleMouseMove = (e: any) => {
    let scaling = isScaling
    let tempImgScale: number = 1
    const { canMouseX, canMouseY } = setCoordinates(e)

    let yDiff: number
    let xDiff: number

    if (e.targetTouches) {
      e.preventDefault()
      if (e.touches.length > 1) {
        //detected a pinch
        setIsScaling(true)
        setIsDragging(false)
        scaling = true
      } else {
        setIsScaling(false)
        setIsDragging(true)
      }
    }
    //console.log(`isScaling : ${isScaling}`)
    if (scaling) {
      //...adding rndScaleTest to force processing of scaling randomly
      let dist = distance(e)
      //Can't divide by zero, so return dist in denom. if touchDist still at initial 0 value
      tempImgScale = dist / (touchDist === 0 ? dist : touchDist)
      //console.log(`imgScale is: ${imgScale}`)
      if (tempImgScale < 1) tempImgScale = 1 //for now no scaling down allowed...
      if (tempImgScale > 2) tempImgScale = 2 //...and scaling up limited to 2.5x
      setSCHeight(Math.floor(imgScale * natHeight))
      setSCWidth(Math.floor(imgScale * natWidth))
      setImgScale(tempImgScale)
      setTouchDist(dist)
    }
    // if the drag flag is set, clear the canvas and draw the image
    if (isDragging) {
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
      if (accel < 4) {
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
    console.log('Mouse LEAVE Event function')
  }

  return (
    <div style={{ padding: '15px' }}>
      <div className="portrait">
        <div
          ref={divRef}
          className="wrapper"
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onDoubleClick={handleDoubleClick}
        >
          {mapImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              alt="tactical-map"
              ref={imgRef}
              src={`data:image/jpeg;base64,${mapImage}`}
              style={{
                transform: `translate(${imgLeft}px, ${imgTop}px)`,
                height: `${scHeight}px`,
                width: `${scWidth}px)`,
                transformOrigin: `top left`,
              }}
              onLoad={handleImageLoad}
            />
          )}
        </div>
      </div>
      <span>{`tactical map imgLeft: ${imgLeft}px `}</span>
      <span>{`imgTop: ${imgTop}px  `}</span>
      <span>{mapImage}</span>
    </div>
  )
}

//objectPosition: `${imgLeft}px ${imgTop}px`,
//transform: `scale(${imgScale}) translate(${imgLeft}px, ${imgTop}px)`,
