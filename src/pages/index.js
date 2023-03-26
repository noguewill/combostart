import Head from "next/head";
import Image from "next/image";
import { Lato } from "next/font/google";
import { Kanjit } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Navbar from "./Navbar";
import Search from "./Search";
import Combos from "./Combos";
import Footer from "./Footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>Street Fighter Combos</title>
        <meta
          name="description"
          content="Combos for the videogame Street Fighter 6 by Capcom"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@1,400;1,600&family=Lato:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Navbar />
        <Search />
        <section className={styles.combos_container}>
          <Combos />
          <Combos />
          <Combos />
          <Combos />
        </section>
        <Footer />
      </main>
    </>
  );
}
