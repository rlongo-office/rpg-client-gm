import React, { useEffect, useState, useRef } from "react";
import UIParent from "./ui-parent";

const UIBottomNavbar = () => {

  return (
<div className="rooter">
  <div className="example">
  <UIParent pageType={`playerPage`}></UIParent>
  </div>
  <div className="Footer--container">
    <button style={{backgroundColor:"DarkGray",color:"white"}}>My footer</button>
  </div>
</div>
  )
}

export default UIBottomNavbar;