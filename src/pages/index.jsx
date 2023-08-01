import Head from "next/head";
import { useEffect } from "react";
import styles from "@/styles/Home.module.css";
import ComboHub from "./ComboHub";
import Cookies from "js-cookie";
import withSessionCheck from "../../components/withSessionCheck";

function Home() {
  useEffect(() => {
    const visited = Cookies.get("visited");
    if (!visited) {
      Cookies.set("visited", "true", { expires: 7 });
    }
  }, []);

  return (
    <>
      <Head>
        <title>Combostart - Where the combos are</title>
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
        <link rel="icon" href="/icons/logoMin.ico" />
      </Head>
      <main className={styles.main}>
        <ComboHub />
      </main>
    </>
  );
}
export default withSessionCheck(Home);
