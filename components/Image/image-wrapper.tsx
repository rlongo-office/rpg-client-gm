import * as React from 'react'
import ImageResponsive from './image-responsive'

interface ImageConfig {
  imgSource: string //full url, base64 converted string for image, or key to App context stored image
  sourceType: number //type of source we are passing, default is url, 1= base64, and 2 = key to image string in app context
  accelRate: number //the rate of change in panning speed
  maxPanRate: number //maximum Pan Speed
  zoomRate: number //rate of zoom, used for dblClick
  zoomMax: number //maximum zoom of image
  fHeight: number //set Height of the wrapper frame
  fWidth: number //set Width of the wrapper frame
  style: React.CSSProperties //The style applied to wrapper for image, includes border, width, height, etc.
}

export default function ImageWrapper(props: ImageConfig) {
  const {
    imgSource,
    sourceType,
    accelRate,
    maxPanRate,
    zoomRate,
    zoomMax,
    fHeight,
    fWidth,
    style,
  } = props
  const imgProps = {
    imgSource,
    sourceType,
    accelRate,
    maxPanRate,
    zoomRate,
    zoomMax,
    fHeight,
    fWidth,
  }

  React.useEffect(() => {}, [])
  return (
    <div style={style}>
      <ImageResponsive {...imgProps}></ImageResponsive>
    </div>
  )
}
