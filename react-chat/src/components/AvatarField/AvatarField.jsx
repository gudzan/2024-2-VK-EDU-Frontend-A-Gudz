import React, { useRef, useState } from "react";
import styles from "./AvatarField.module.scss"
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import defaultAvatar from "../../assets/images/default-avatar.jpg"
import classNames from "classnames";
import { convertFileToBase64 } from "../../utils";


const AvatarField = ({avatarImg, canEdit, onChange}) => {
  const avatarInput = useRef(null)
  const avatar = avatarImg ?? defaultAvatar

  const avatarClassName = classNames(styles.avatar, {
    [styles.myAvatar]: canEdit,
  })

  const openFileInput = () => {
    avatarInput.current.click()
  }

  const handleFiles = async (e) => {
    if (e.target.files[0].size >= 10 * 1024 * 1024) {
      alert('Файл слишком большой! Выбери другой');
      return
    }
    const avatar = await convertFileToBase64(e.target.files[0]);
    onChange(avatar)
  }

  return (
    <div className={styles.field__avatar} onClick={openFileInput}>
      <img src={avatar} alt="Аватар" className={avatarClassName} />
      <PhotoCameraIcon className={styles.hover} hidden={!canEdit} />
      <input type="file" name="avatar" ref={avatarInput} hidden={true} onChange={handleFiles} disabled={!canEdit} accept=".jpg,.jpeg,.png"></input>
    </div>
  )
}

export default AvatarField;
