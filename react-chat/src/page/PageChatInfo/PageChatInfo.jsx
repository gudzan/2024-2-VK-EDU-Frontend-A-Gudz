import styles from "./PageChatInfo.module.scss"
import Layout from "../../components/Layout/index.js";
import Header from "../../components/Headers/Header/Header.jsx";
import ChatInfo from "../../components/ChatInfo";

const PageChatInfo = () => {
  const headerText = "Информация о чате"

  return (
    <Layout>
      <Header text={headerText} />
      <main className={styles.info}>
        <ChatInfo />
      </main>
    </Layout>
  );
}

export default PageChatInfo;
