import React from "react";
import "./PageAuth.scss"
import Layout from "../../components/Layout";
import { HeaderPageLogin } from "../../components/Headers";
import Auth from "../../components/Auth/Auth";

const PageAuth = () => {
  return (
    <Layout>
      <HeaderPageLogin text="Вход" />
      <Auth />
    </Layout>
  )
}

export default PageAuth;
