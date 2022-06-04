import * as React from 'react'
import * as types from '../../types/rpg-types'
import imgSource from './testwebmap.jpg'
import * as vars from '../../data/mapImage'

const testImg = require('./testwebmap.jpg')

export default function CleanImageTest() {
  let divRef = React.useRef<HTMLDivElement>(null)
  let imgRef = React.useRef<HTMLImageElement>(null)
  const [loaded, setLoaded] = React.useState<boolean>(false)
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
  const [cfg, setCfg] = React.useState<types.ImageConfig>({
    img: '',
    imgTOP: 0,
    imgLEFT: 0,
    offsetX: 0,
    offsetY: 0,
    isFirstPress: true,
    isDragging: false,
    isScaling: false,
    divHeight: 500,
    divWidth: 500,
    topLimit: 0,
    leftLimit: 0,
    isLoaded: true,
    oldMouseX: 0,
    oldMouseY: 0,
    touchDist: 0,
  })

  /* const imgValues = React.useMemo(()=>{

},[loaded,]

) */

  const setNewImageLimits = () => {
    const img = imgRef
    let heightLimit: number
    let widthLimit: number
    console.log(`imgScale is: ${imgScale}`)
    //console.log(`current offsets: ${imgLeft}:${imgTop}`)
    console.log(`img width/Height: ${img.current?.width}:${img.current?.height}`)
    console.log(img)
    img.current
      ? (heightLimit = Math.floor(imgScale * img.current.naturalHeight - cfg.divHeight))
      : (heightLimit = 0)
    img.current
      ? (widthLimit = Math.floor(imgScale * img.current.naturalWidth - cfg.divWidth))
      : (widthLimit = 0)
    setTopLimit(-heightLimit)
    setLeftLimit(-widthLimit)
    setImgLeft(0)
    setImgTop(0)
    //setImgLeft(Math.floor(imgScale*imgLeft))
    //setImgTop(Math.floor(imgScale*imgTop))
    //setSCHeight(img.current ? img.current.height : 0)7
    //setSCWidth(img.current ? img.current.width : 0)
    console.log(
      'New Image limits set with topLimit:' + heightLimit + ' and leftLimit:' + widthLimit
    )
  }

  const handleImageLoad = () => {
    if (imgRef) {
      const img = imgRef
      //console.log(imgRef)
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
    /*     const heightLimit = e.nativeEvent.clientHeight - cfg.divHeight
    const widthLimit = e.nativeEvent.clientWidth - cfg.divWidth
    setCfg({ ...cfg, topLimit: heightLimit, leftLimit: widthLimit })
    console.log("Image Loaded with topLimit:" + heightLimit + " and leftLimit:" + widthLimit)
       console.log("Img ONLOAD Called") */
  }

  React.useEffect(() => {
    if (imgRef.current?.complete) {
      handleImageLoad()
    }
  }, [])

  React.useEffect(() => {
    setNewImageLimits()
    console.log(`imgScale is: ${imgScale}`)
    console.log('Image has with topLimit:' + topLimit + ' and leftLimit:' + leftLimit)
  }, [imgScale])

  /* React.useEffect(()=>{

},[topLimit,leftLimit]) */

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
    let { canMouseX, canMouseY } = setCoordinates(e)
    setIsScaling(false)
    setIsDragging(false)
    setIsFirstPress(true)
    setAccel(1)
    console.log('Mouse UP Event function')
  }
  const handleMouseDown = (e: any) => {
    const { canMouseX, canMouseY } = setCoordinates(e)
    //console.log('Mouse DOWN Event function')
    e.preventDefault()
    //console.log(`Mouse Down ${canMouseX}:${canMouseY}`)
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
      setImgScale(imgScale + 0.5)
    }
  }

  const handleMouseMove = (e: any) => {
    let scaling = isScaling
    let dragging = isDragging
    let tempImgScale: number = 1
    const { canMouseX, canMouseY } = setCoordinates(e)

    let yDiff: number
    let xDiff: number
    let newLeft: number
    let newTop: number

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
      //console.log(`Canvas Mouse Coords: ${canMouseX}:${canMouseY}`)
      //console.log(`Old Mouse Coords: ${oldXCoord}:${oldYCoord}`)
      yDiff = canMouseY && oldYCoord ? accel * (canMouseY - oldYCoord) : 0
      xDiff = canMouseX && oldXCoord ? accel * (canMouseX - oldXCoord) : 0
      //console.log(`Coordinate Diffs: ${xDiff}:${yDiff}`)
      //this.subImgX += this.xDiff;
      //this.subImgY += this.yDiff;
      //console.log(`Offset Limits: ${leftLimit}:${topLimit}`)
      if (imgLeft + xDiff <= leftLimit) {
        //xDiff = 0
        setImgLeft(leftLimit)
      } else if (imgLeft + xDiff >= 0) {
        //xDiff = 0
        setImgLeft(0)
      } else setImgLeft(imgLeft + xDiff)

      if (imgTop + yDiff <= topLimit) {
        //yDiff = 0
        setImgTop(topLimit)
      } else if (imgTop + yDiff >= 0) {
        //yDiff = 0
        setImgTop(0)
      } else setImgTop(imgTop + yDiff)
      /*       newLeft = imgLeft + xDiff
      newTop = imgTop + yDiff
      console.log(`New Left and Top: ${newLeft}:${newTop}`)
      setImgLeft(newLeft)
      setImgTop(newTop) */
      //trying out a mouse move acceleration for dragging
      if (accel < 4) {
        setAccel(accel + 1)
      }
    }
    //console.log('Mouse **MOVE Event function')
    setOldXCoord(canMouseX || 0)
    setOldYCoord(canMouseY || 0)
  }
  const handleMouseLeave = (e: any) => {
    setIsScaling(false)
    setIsDragging(false)
    setIsFirstPress(true)
    setAccel(1)
    console.log('Mouse LEAVE Event function')
  }

  return (
    <div>
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
          <img
            ref={imgRef}
            src={`data:image/jpeg;base64,${vars.bigImage}`}
            style={{
              transform: `scale(${imgScale})`,
              transformOrigin: `top left`,
              objectPosition: `${imgLeft}px ${imgTop}px`,
            }}
            onLoad={handleImageLoad}
          />
        </div>
      </div>
      <span>{`imgLeft: ${imgLeft}px `}</span>
      <span>{`imgTop: ${imgTop}px  `}</span>
    </div>
  )
}

//            onLoad={handleImageLoad}
/*
              height: `${scHeight}px`,
              width: `${scWidth}px`,
              */

/* const handleImageLoad = React.useCallback(() => {
    console.log('loaded');
    setLoaded(true);
    const img = imgRef
    let heightLimit:number
    let widthLimit:number
    img.current ? heightLimit = img.current.clientHeight - cfg.divHeight : heightLimit=0
    img.current ? widthLimit = img.current.clientWidth - cfg.divWidth : widthLimit=0
    setTopLimit(-heightLimit)
    setLeftLimit(-widthLimit)
    setCfg({ ...cfg, topLimit: heightLimit, leftLimit: widthLimit })
    console.log("Image Loaded with topLimit:" + heightLimit + " and leftLimit:" + widthLimit)
  }, []) */
