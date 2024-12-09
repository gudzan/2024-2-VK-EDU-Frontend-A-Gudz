import { useEffect, useRef, useState } from "react";
import styles from "./FooterChat.module.scss"
import AttachFileIcon from "@mui/icons-material/AttachFile";
import PhotoIcon from "@mui/icons-material/Photo";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import PlaceIcon from "@mui/icons-material/Place";
import SendIcon from "@mui/icons-material/Send";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import classnames from "classnames";

const FooterChat = ({ sendMessage }) => {
  const inputRef = useRef(null);
  const fileInput = useRef(null)
  const attachRef = useRef(null);
  const stopRef = useRef(null)
  const [recordedBlob, setRecordedBlob] = useState(null);
  const mediaStream = useRef(null);
  const mediaRecorder = useRef(null);
  const chunks = useRef([]);
  const [messageText, setMessageText] = useState("")
  const [openAttach, setOpenAttach] = useState(false)
  const [isRecorder, setIsRecorder] = useState(false)

  const attachClassName = classnames(styles.attach, {
    [styles.open]: openAttach,
    [styles.close]: !openAttach,
  })

  const inputClassName = classnames(styles.input, {
    [styles.voice]: isRecorder,
  })

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length > 0) {
      let formData = new FormData()
      for (let i = 0; i < droppedFiles.length; i++) {
        formData.append("files", droppedFiles[i]);
      }
      sendMessage(formData)
    }
  };

  const toggleAttach = (event) => {
    if (attachRef.current && !attachRef.current.contains(event.target)) {
      setOpenAttach(false)
    }
    else {
      setOpenAttach(true)
    }
  }

  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.addEventListener("drop", handleDrop);
    return () => {
      if (inputRef.current) {
        inputRef.current.removeEventListener("drop", handleDrop);
      }
    };
  }, []);

  useEffect(() => {
    if (isRecorder) {
      inputRef.current.disabled = true
      setMessageText("")
      inputRef.current.placeholder = "Идет запись..."
    }
    else {
      inputRef.current.disabled = false
      inputRef.current.value = ""
      inputRef.current.placeholder = "Введите сообщение"
    }
  }, [isRecorder, recordedBlob]);

  useEffect(() => {
    inputRef.current.focus();
    if (openAttach) {
      document.addEventListener("mousedown", toggleAttach)
    }
    return () => document.removeEventListener("mousedown", toggleAttach)
  }, [openAttach])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (messageText === "") { return }
    let formData = new FormData();
    formData.append("text", messageText);
    sendMessage(formData)
    setMessageText("")
    inputRef.current.focus();
  }

  const getGeolocation = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    const success = (pos) => {
      const { latitude, longitude } = pos.coords;
      let formData = new FormData();
      formData.append("text", `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`);
      sendMessage(formData)
    }
    const error = (err) => {
      console.log(`ERROR(${err.code}): ${err.message}`);
    }
    navigator.geolocation.getCurrentPosition(success, error, options);
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(
        { audio: true }
      );
      mediaStream.current = stream;
      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.current.push(e.data);
        }
      };
      mediaRecorder.current.onstop = async () => {
        const recordedBlob = new Blob(
          chunks.current, { type: "audio/mp3" }
        );
        setRecordedBlob(recordedBlob);
        const file = new File([recordedBlob], "voice.mp3", { type: "audio/mp3" })
        let formData = new FormData();
        formData.append("voice", file);
        sendMessage(formData)
        setIsRecorder(false)
        setRecordedBlob(null)
        chunks.current = [];
      };
      setIsRecorder(true)
      mediaRecorder.current.start();
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state === "recording") {
      mediaRecorder.current.stop();
    }
    if (mediaStream.current) {
      mediaStream.current.getTracks().forEach((track) => {
        track.stop();
      });
    }
  };

  const inputChange = (e) => setMessageText(e.target.value)

  const getEventButton = () => {
    if (isRecorder || recordedBlob !== null) {
      return <button type="button" className={styles.stop} ref={stopRef} onClick={stopRecording}><StopCircleIcon /></button>
    }
    return <button type="submit" className={styles.icon}><SendIcon /></button>
  }

  const openFileInput = () => {
    fileInput.current.click()
  }

  const handleFiles = async (e) => {
    let formData = new FormData()
    const fileList = e.target.files
    for (let i = 0; i < fileList.length; i++) {
      formData.append("files", fileList[i]);
    }
    sendMessage(formData)
  }

  return (
    <footer>
      <form className={styles.form} action="/" onSubmit={handleSubmit} >
        <button type="button" className={styles.icon} onClick={toggleAttach} ref={attachRef}><AttachFileIcon /></button>
        <div className={attachClassName}>
          <div className={styles.row} onClick={getGeolocation}>
            <PlaceIcon />
            Геопозиция
          </div>
          <div className={styles.row} onClick={openFileInput}>
            <PhotoIcon />
            Фото
          </div>
          <div className={styles.row} onClick={startRecording}>
            <KeyboardVoiceIcon />
            Аудио
          </div>
        </div>
        <input type="file" name="files" ref={fileInput} hidden={true} onChange={handleFiles} accept=".jpg,.jpeg,.png" multiple></input>
        <input ref={inputRef} className={inputClassName} tabIndex="0" placeholder="Введите сообщение" type="text" value={messageText}
          onChange={inputChange} />
        {getEventButton()}
      </form>
    </footer>
  )
}

export default FooterChat;
