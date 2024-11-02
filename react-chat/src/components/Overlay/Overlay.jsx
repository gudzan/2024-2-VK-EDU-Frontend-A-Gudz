import React from "react";
import "./Overlay.scss"
import classnames from 'classnames';

const Overlay = ({ openOverlay, closeOverlay }) => {
  const overlayClassName = classnames('overlay', {
    "open": openOverlay,
    "close": !openOverlay
  });

  return (
    <div className={overlayClassName} onClick={closeOverlay}></div>
  )
}

export default Overlay;
