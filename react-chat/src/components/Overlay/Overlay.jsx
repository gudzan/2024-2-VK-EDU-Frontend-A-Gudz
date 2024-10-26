import React from "react";
import "./Overlay.scss"

const Overlay = ({ openOverlay, closeOverlay }) => {
  const overlayClassName = `overlay ${openOverlay ? "open" : "close"}`

  return (
    <div className={overlayClassName} onClick={closeOverlay}></div>
  )
}

export default Overlay;
