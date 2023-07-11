import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "@/styles/Home.module.css";
import WelcomePage from "./WelcomePage";
import ComboHub from "./ComboHub";
import Cookies from "js-cookie";
import withSessionCheck from "../../components/withSessionCheck";

function Home() {
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const visited = Cookies.get("visited");
    if (!visited) {
      Cookies.set("visited", "true", { expires: 7 });
      setShowWelcome(true);
    }
  }, []);

  return (
    <>
      <Head>
        <title>COMBOSTART</title>
        <meta
          name="description"
          content="Combos for various fighting videogames"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link rel="icon" href="/logoMin.ico" />
      </Head>
      <main className={styles.main}>
        {showWelcome ? <WelcomePage /> : <ComboHub />}
      </main>
    </>
  );
}
export default withSessionCheck(Home);
