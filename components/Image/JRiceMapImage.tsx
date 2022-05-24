import * as React from 'react'
import * as types from '../../types/rpg-types'
import imgSource from './testwebmap.jpg'
import * as vars from '../../data/mapImage'

const testImg = require('./testwebmap.jpg')

export default function JRiceMapImage() {
  let divRef = React.useRef(null)
  const [imgTop, setImgTop] = React.useState<number>(0)
  const [imgLeft, setImgLeft] = React.useState<number>(0)
  const [isScaling, setIsScaling] = React.useState<boolean>(false)
  const [isDragging, setIsDragging] = React.useState<boolean>(false)
  const [isFirstPress, setIsFirstPress] = React.useState<boolean>(false)
  const [touchDist, setTouchDist] = React.useState<number>(0)
  const [oldCoords, setOldCoords] = React.useState<types.Coords>({ x: 0, y: 0 })
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

  // src={{uri: `data:image/jpeg;base64,${imgString}`}}

  /* const renderImgTag = () => {
    let content: JSX.Element[] = []
    let inputProps: Object = {
        src: `data:image/jpeg;base64,${imgString}`
      }
    let labelEL = React.createElement('img', inputProps)
    content.push(labelEL)
    return content
} */

  React.useEffect(() => {
    const div:any = divRef.current;
    div.addEventListener('mousedown', handleMouseDown, false);
    div.addEventListener('mousemove', handleMouseMove, false);
    div.addEventListener('mouseup', handleMouseUp, false);
    div.addEventListener('mouseleave', handleMouseLeave, false);
    div.addEventListener('touchstart', handleMouseDown, false);
    div.addEventListener('touchmove', handleMouseMove, false);
    div.addEventListener('touchend', handleMouseUp, false);
  }, [])

  function distance(e: any) {
    let zw = e.touches[0].pageX - e.touches[1].pageX
    let zh = e.touches[0].pageY - e.touches[1].pageY
    return Math.sqrt(zw * zw + zh * zh)
  }

  function setCoordinates(e: any) {
    let canMouseX: number
    let canMouseY: number

    if (e?.clientX && e?.clientY) {
      //console.log(e)
      //canMouseX = parseInt(e.clientX - cfg.offsetX)
      canMouseX = e.clientX - cfg.offsetX
      canMouseY = e.clientY - cfg.offsetY
      //console.log(`${canMouseX}:${canMouseY}`)
    } else if (e?.targetTouches) {
      canMouseX = e?.targetTouches[0]?.clientX - cfg.offsetX
      canMouseY = e?.targetTouches[0]?.clientY - cfg.offsetY
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
    //console.log(`Mouse Up ${canMouseX}:${canMouseY}`)
    //let imgLEFT = -Math.floor(Math.random() * 1900)
    //let imgTOP = -Math.floor(Math.random() * 1000)
    //setImgLeft(imgLEFT)
    //setImgTop(imgTOP)
    //setCfg({ ...cfg, imgLEFT: imgLEFT, imgTOP: imgTOP })
    setIsScaling(false)
    setIsDragging(false)
    setIsFirstPress(true)
  }
  const handleMouseDown = (e: any) => {
    const { canMouseX, canMouseY } = setCoordinates(e)
    //console.log(`Mouse Down ${canMouseX}:${canMouseY}`)
    canMouseX ? setCfg({ ...cfg, oldMouseX: canMouseX }) : setCfg({ ...cfg, oldMouseX: 0 })
    canMouseY ? setCfg({ ...cfg, oldMouseY: canMouseY }) : setCfg({ ...cfg, oldMouseY: 0 })
    setIsDragging(true)
    setCfg({ ...cfg, isDragging: true })
    if (e?.targetTouches) {
      e.preventDefault()
      if (e.touches.length > 1) {
        // detected a pinch
        setTouchDist(distance(e))
        setCfg({ ...cfg, touchDist: distance(e), isScaling: true })
        setIsScaling(true)
      } else {
        // set the drag flag
        setIsScaling(false)
        setIsDragging(true)
      }
    }
    setIsFirstPress(false)
    setCfg({ ...cfg, isFirstPress: true })
    console.log('Mouse DOWN Event function')
    console.log(`${canMouseX}:${canMouseY}`)
  }
  const handleMouseMove = (e: any) => {
    let scaling = isScaling
    let dragging = isDragging
    let imgScale: number = 1
    const { canMouseX, canMouseY } = setCoordinates(e)
    let yDiff: number
    let xDiff: number

    if (e.clientX && e.clientY) {
      setIsDragging(true)
    } else if (e.targetTouches) {
      e.preventDefault()
      if (e.touches.length > 1) {
        //detected a pinch
        setIsScaling(true)
        setIsDragging(false)
        setIsScaling(true)
      } else {
        setIsScaling(false)
        setIsDragging(true)
      }
    }
    if (scaling) {
      imgScale = distance(e) / touchDist
      if (imgScale < 1) imgScale = 1
    }
    // if the drag flag is set, clear the canvas and draw the image
    if (isDragging && !isFirstPress) {
      yDiff = canMouseY && oldCoords.y ? canMouseY - oldCoords.y : 0
      xDiff = canMouseX && oldCoords.x ? canMouseX - oldCoords.x : 0
      //this.subImgX += this.xDiff;
      //this.subImgY += this.yDiff;
      if (imgLeft + xDiff <= cfg.leftLimit) {
        xDiff = 0
      } else if (imgLeft + xDiff >= 0) {
        xDiff = 0
      }
      if (imgTop + yDiff <= cfg.topLimit) {
        yDiff = 0
      } else if (imgTop + yDiff >= 0) {
        yDiff = 0
      }
      setImgTop(imgTop + yDiff)
      setImgLeft(imgLeft + xDiff)
    }
    console.log('Mouse Move Event function')
    setOldCoords({ x: canMouseX, y: canMouseX })
  }
  const handleMouseLeave = (e: any) => {
    setIsScaling(false)
    setIsDragging(false)
    setIsFirstPress(true)
  }

  return (
    <div>
      <div className="portrait">
        <div
          id="canvas"
          ref={divRef}
          className="wrapper"
        >
          <img
            src={`data:image/jpeg;base64,${vars.bigImage}`}
            style={{ objectPosition: `${imgLeft}px ${imgTop}px` }}
          />
        </div>
      </div>
    </div>
  )
}
