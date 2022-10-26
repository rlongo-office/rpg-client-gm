import React, { Component } from "react";
import { useAppContext } from '../../context/app-provider'

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

function Example(){

  const { images } = useAppContext()

    return (
      <TransformWrapper
      >
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
          <>
            <div className="tools">
              <button onClick={() => zoomIn()}>+</button>
              <button onClick={() => zoomOut()}>-</button>
              <button onClick={() => resetTransform()}>x</button>
            </div>
            <TransformComponent>
              <img src={`data:image/jpeg;base64,${images[0]}`} alt="test" />
              <div>Example text</div>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    );
}

export default Example