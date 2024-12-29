import Layout from "../../components/Layout";
import Auth from "../../components/Auth/Auth";
import Header from "../../components/Headers/Header/Header";

const PageAuth = () => {
  return (
    <Layout>
      <Header text="Вход" arrowBack={false}/>
      <Auth />
    </Layout>
  );
};

export default PageAuth;
