import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Navbar from "./Navbar";
import Search from "./Search";
import Combos from "./Combos";

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
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Navbar />
        <Search />
        <section className={styles.combos__container}>
          <Combos />
          <Combos />
          <Combos />
          <Combos />
        </section>
      </main>
    </>
  );
}
