import React from "react";
import "./PageRegister.scss"
import Register from "../../components/Register";
import Layout from "../../components/Layout";
import { HeaderPageLogin } from "../../components/Headers";

const PageRegister = () => {
  return (
    <Layout>
      <HeaderPageLogin text="Регистрация" />
      <Register />
    </Layout>
  )
}

export default PageRegister;
