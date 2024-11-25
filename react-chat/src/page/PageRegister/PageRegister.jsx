import React from "react";
import Register from "../../components/Register";
import Layout from "../../components/Layout";
import Header from "../../components/Headers/Header/Header";

const PageRegister = () => {
  return (
    <Layout>
      <Header text="Регистрация" arrowBack={false}/>
      <Register />
    </Layout>
  )
}

export default PageRegister;
