import React from "react";
import styles from "./Overlay.module.scss"
import classnames from 'classnames';

const Overlay = ({ openOverlay, closeOverlay }) => {
  const overlayClassName = classnames(styles.overlay, {
    [styles.open]: openOverlay,
    [styles.close]: !openOverlay,
  })

  return (
    <div className={overlayClassName} onClick={closeOverlay}></div>
  )
}

export default Overlay;
