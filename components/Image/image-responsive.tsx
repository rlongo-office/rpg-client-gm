import React, { useRef, useState, useEffect } from 'react'
import { useAppContext } from '../../context/app-provider'

type ImageProps = {
  imgSource: string //base64 converted string for image
  sourceType: number //type of source we are passing, default is url, 1= base64, and 2 = key to image string in app context
  accelRate: number //the rate of change in panning speed
  maxPanRate: number //maximum Pan Speed
  zoomRate: number //rate of zoom, used for dblClick
  zoomMax: number //maximum zoom of image
  fHeight: number //set Height of the wrapper frame
  fWidth: number //set Width of the wrapper frame
}

export default function ImageResponsive(props: ImageProps) {
  const { images } = useAppContext()
  const imgRef = useRef<HTMLImageElement>(null)
  const { imgSource, sourceType, accelRate, maxPanRate, zoomRate, zoomMax, fHeight, fWidth } = props

  const [imgTop, setImgTop] = useState(0) //translation of image from top: 0 <= imgTop <= topLimit
  const [imgLeft, setImgLeft] = useState(0) //translation of image from top: 0 <= imgLeft <= leftLimit
  const [topLimit, setTopLimit] = useState(0) //limit of translation in y direction (top) for current image size
  const [leftLimit, setLeftLimit] = useState(0) //limit of translation in y direction (left) for current image size
  const [isScaling, setIsScaling] = useState(false) //flag to set 'scaling' state, which allows zoooming of image
  const [isDragging, setIsDragging] = useState(false) //flag to set 'dragging' state, which allows panning of image
  const [orgHeight, setOrgHeight] = useState<number>(0) //The original height of image before any scaling
  const [orgWidth, setOrgWidth] = useState<number>(0) //The original width of image before any scaling
  const [scHeight, setScHeight] = useState<number>(0) //The current scaled height of image before any scaling
  const [scWidth, setScWidth] = useState<number>(0) //The current scaled width of image before any scaling
  const [imgScale, setImgScale] = useState(1) //The current scale rate for image
  const [touchDist, setTouchDist] = useState(0) //The last recorded touch distance - used for pinch testing
  const [isLoaded, setIsLoaded] = useState(false) //image has/has not loaded flag
  const [offsetTop] = useState(0) //top offset from top most element. Required to accurate calculate mouse coordinates
  const [offsetLeft, setOffsetLeft] = useState(0) //top offset from left most element. Required to accurate calculate mouse coordinates
  const [oldXCoord, setOldXCoord] = useState(0) //stored previous mouse X coordinate
  const [oldYCoord, setOldYCoord] = useState(0) //stored previous mouse Y coordinate
  const [source, setSource] = useState<string>() //image source string as determined by passed parameter options
  const [scaleInc] = useState(0.025) //increment of scaling allowed
  const [panRate, setPanRate] = useState(1) //current panning speed

  /*LOADING, IMAGE PROCESSING AND STATE CHANGES*/

  // This will only get called if fHeight or fWidth differ
  // from the previous fHeight and fWidth used in the callback.
  const handleImageLoad = React.useCallback(() => {
    if (imgRef) {
      const img = imgRef
      let offLeft: number
      let offTop: number
      let height: number
      let width: number
      img.current ? (height = img.current.naturalHeight) : (height = 0)
      img.current ? (width = img.current.naturalWidth) : (width = 0)
      img.current ? (offLeft = img.current?.offsetLeft) : (offLeft = 0)
      img.current ? (offTop = img.current?.offsetTop) : (offTop = 0)
      //Top and left Limits are negative numbers: we are translationg up and left and screen plan is positive down and right on computers
      setTopLimit(-(height - fHeight))
      setLeftLimit(-(width - fWidth))
      setOrgHeight(height)
      setOrgWidth(width)
      setScHeight(height)
      setScWidth(width)
      setOffsetLeft(offLeft)
      setOffsetLeft(offTop)
    }
  }, [fHeight, fWidth])

  //After every change in scale, we need to change scaling width,height and translate to new position near pinch
  const setNewImageLimits = (scale: number, x: number, y: number) => {
    const img = imgRef
    let newTopLimit
    let newLeftLimit
    let newSCHeight = Math.round(orgHeight * scale)
    let newSCWidth = Math.round(orgWidth * scale)
    newTopLimit = -(newSCHeight - fHeight)
    newLeftLimit = -(newSCWidth - fWidth)
    setScHeight(newSCHeight)
    setScWidth(newSCWidth)
    setTopLimit(newTopLimit)
    setLeftLimit(newLeftLimit)
    let newLeft = Math.round((scale / imgScale) * imgLeft) //not exactly correct scaled pinch X origin but best we can do now
    let newTop = Math.round((scale / imgScale) * imgTop) //not exactly correct scaled pinch Y origin but best we can do now
    //New left coord cannot be less than new left limit or greater than 0
    if (newLeft < newLeftLimit) {
      setImgLeft(newLeftLimit)
    } else if (newLeft >= 0) {
      setImgLeft(0)
    } else setImgLeft(newLeft)
    //New top coord cannot be less than new top limit or greater than 0
    if (newTop < newTopLimit) {
      setImgTop(newTopLimit)
    } else if (newTop >= 0) {
      setImgTop(0)
    } else setImgTop(newTop)
  }

  const setImageSource = React.useCallback(() => {
    switch (sourceType) {
      //the source is a base64 string itself...
      case 1:
        setSource(`data:image/jpeg;base64,${imgSource}`)
        break
      //...or it is the key to an image stored in our images context object...
      case 2:
        setSource('data:image/jpeg;base64,' + images[imgSource])
        break
      //...or it's a plain url
      default:
        setSource(imgSource)
        break
    }
  }, [images, imgSource, sourceType])

  useEffect(() => {
    setImageSource()
    if (imgRef.current?.complete) {
      //always need to check if image has actually loaded (given NextJS behavior)
      handleImageLoad()
      setIsLoaded(true)
    }
  }, [setImageSource, handleImageLoad])

  useEffect(() => {}, [scWidth])

  /* POINT AND DISTANCE CALCULATION FUNCTIONS*/

  //function called when we detect more than one touch. Assuming pinch only between first two touched detected
  function distance(e: any) {
    let zw = e.touches[0].pageX - e.touches[1].pageX
    let zh = e.touches[0].pageY - e.touches[1].pageY
    if (zw * zw + zh * zh != 0) {
      return Math.sqrt(zw * zw + zh * zh)
    } else return 0
  }

  function setCoordinates(e: any) {
    let canMouseX: number = 0
    let canMouseY: number = 0
    let canMouseX1: number
    let canMouseY1: number
    let canMouseX2: number
    let canMouseY2: number
    if (e?.nativeEvent?.clientX && e?.nativeEvent?.clientY) {
      //canMouseX = parseInt(e.clientX - cfg.offsetX)
      canMouseX = e.nativeEvent.clientX - offsetLeft
      canMouseY = e.nativeEvent.clientY - offsetTop
    } else if (e?.nativeEvent?.targetTouches) {
      canMouseX1 = e.nativeEvent.targetTouches.item(0)?.clientX - offsetLeft
      canMouseY1 = e.nativeEvent.targetTouches.item(0)?.clientY - offsetTop
      if (e?.nativeEvent?.touches?.length > 1) {
        //To get the center of the 'pinch' we to 'average' the two points
        canMouseX2 = e.nativeEvent.targetTouches.item(1)?.clientX - offsetLeft
        canMouseY2 = e.nativeEvent.targetTouches.item(1)?.clientY - offsetTop
        canMouseX = Math.round((canMouseX1 + canMouseX2) / 2)
        canMouseX = Math.round((canMouseY1 + canMouseY2) / 2)
      } else {
        canMouseX = canMouseX1
        canMouseY = canMouseY1
      }
    }
    return {
      canMouseX,
      canMouseY,
    }
  }

  /* MOUSE TOUCH HANDLERS
  variables canMouseX/Y refer to the CURRENT coordinates of the mouse or touch for current detected event on the 'canvas'.
  canMouseX/Y coordinates are compared to the last stored coordinates (oldXCoord,oldYCoord) for purposed of
  determining the direction of a drag. In the case of pinch, two sets of current coordinates measure a distance between
  those two points and that to a previously stored distance to determine a pinch "in" or "out"
  */

  //When Mouse button up (touch released) reset to orginal setting
  const handleMouseUp = (e: React.TouchEvent | React.MouseEvent) => {
    setIsScaling(false)
    setIsDragging(false)
    setPanRate(1)
    setTouchDist(0)
  }

  const handleMouseLeave = (e: React.TouchEvent | React.MouseEvent) => {
    //for now, leaving the image does the same as release mouse or touch
    handleMouseUp(e)
  }

  const onStart = (event: React.TouchEvent | React.MouseEvent) => {
    event.persist()
    console.log('event ', event)
    if (event.nativeEvent instanceof TouchEvent) {
      console.log(event.nativeEvent.touches)
    }

    if (event.nativeEvent instanceof MouseEvent) {
      console.log(event.nativeEvent.screenX)
    }
  }

  const handleMouseDown = (event: React.TouchEvent | React.MouseEvent) => {
    event.preventDefault()

    const { canMouseX, canMouseY } = setCoordinates(event)
    canMouseX ? setOldXCoord(canMouseX) : setOldXCoord(0)
    canMouseY ? setOldYCoord(canMouseY) : setOldYCoord(0)

    setIsDragging(true)

    if (event.nativeEvent instanceof TouchEvent) {
      console.log(event.nativeEvent.touches)
    }

    // Is this a touch event (mobile)?
    // See: https://stackoverflow.com/questions/54688147/react-typescript-event-type-for-both-interfaces-mouseevent-and-touchevent

    if (event.nativeEvent instanceof TouchEvent && 'targetTouches' in event) {
      //test for more than one touch to detect pinch
      if (event?.nativeEvent?.touches?.length > 1) {
        setTouchDist(distance(event)) //set pinch distance to test for zooming in/out later
        setIsScaling(true) //detected pinch so we are now scaling...
        setIsDragging(false) //...and we are not dragging
      } else {
        // otherwise, a single detected 'down' touch means we are dragging/panning not scaling
        setIsScaling(false)
        setIsDragging(true)
      }
    }
  }

  // Double click acts as quick scale option, gives PC users scaling ability, and allows for quick resetting back
  // to scale = 1 (scaling cycle back in this handler to 1 after max reached)
  const handleDoubleClick = (e: any) => {
    const { canMouseX, canMouseY } = setCoordinates(e)
    let tempScale
    //If we scale beyond set max, reset to scale of 1
    if (imgScale > zoomMax) {
      tempScale = 1
    } else {
      tempScale = imgScale + 0.5
    }
    setNewImageLimits(tempScale, canMouseX, canMouseY)
    setImgScale(tempScale)
  }

  const handleMouseMove = (e: any) => {
    let tempImgScale: number = 1
    const { canMouseX, canMouseY } = setCoordinates(e)
    let scalediff = 0.025

    // if the scaling flag is set, we change the actual image dimensions per calculated scale
    // this method is a departure from using transformation: scale. Changing the actual image size
    // allowed for proper and accurate testing of limits on movement. This was harder to achieve
    //with a transform scale of the image
    if (isScaling) {
      let dist = distance(e)
      dist < touchDist ? (tempImgScale = imgScale - scaleInc) : (tempImgScale = imgScale + scaleInc)
      if (tempImgScale < 1) tempImgScale = 1 //for now no scaling down below original scale
      if (tempImgScale > zoomMax) tempImgScale = zoomMax
      setNewImageLimits(tempImgScale, canMouseX, canMouseY)
      setImgScale(tempImgScale)
      //changing scale should fire a rerender because of useEffect
      setTouchDist(dist)
    }

    // if the drag flag is set, we pan the image by transformation:translation
    if (isDragging) {
      let yDiff: number
      let xDiff: number
      yDiff = canMouseY && oldYCoord ? panRate * (canMouseY - oldYCoord) : 0
      xDiff = canMouseX && oldXCoord ? panRate * (canMouseX - oldXCoord) : 0
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
      //to speed up panning as user drags mouse/touch we can change the 'speed' of panning
      if (panRate + accelRate < maxPanRate) {
        setPanRate(panRate + accelRate)
      }
    }
    setOldXCoord(canMouseX || 0)
    setOldYCoord(canMouseY || 0)
  }

  return (
    <div>
      {images && (
        /*eslint-disable-next-line @next/next/no-img-element*/
        <img
          alt="map"
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onDoubleClick={handleDoubleClick}
          ref={imgRef}
          src={`data:image/jpeg;base64,${images}`}
          style={{
            transform: `translate(${imgLeft}px, ${imgTop}px)`,
            transformOrigin: 'top left',
            width: `${scWidth}px`,
            height: `${scHeight}px`,
          }}
          onLoad={handleImageLoad}
        />
      )}
    </div>
  )
}
