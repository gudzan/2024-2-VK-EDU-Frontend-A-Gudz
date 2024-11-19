import React from "react";
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
