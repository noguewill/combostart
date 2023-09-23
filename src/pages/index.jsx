import Head from "next/head";
import styles from "@/styles/Home.module.css";
import ComboHub from "./ComboHub";

function Home() {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link rel="icon" href="/icons/tabIcon.ico" />
      </Head>
      <main className={styles.main}>
        <ComboHub />
      </main>
    </>
  );
}
export default Home;
