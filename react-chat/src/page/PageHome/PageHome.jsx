import React, { useEffect, useState } from "react";
import "./PageHome.scss"
import { useParams } from "react-router-dom";

import Auth from "../../components/Auth";
import Register from "../../components/Register";

const PageHome = () => {
  // const { type } = useParams()
  // const formType = type === "register" ? type : "auth";
  const formType = "register"
  console.log(formType);
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (formType === "register") {
      setForm(<Register />)
    }
    else {
      setForm(<Auth />)
    }
  }, [])

  return (
    <>
      <p>Супер Мессенджер</p>
      {form}
    </>
  )
}

export default PageHome;
