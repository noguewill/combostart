import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import Navbar from "./Navbar";
import Search from "./Search";
import ComboCard from "./ComboCard";
import WelcomePage from "./WelcomePage";
import ThemedFooter from "./ThemedFooter";
import CookieBanner from "./CookieBanner";
import ComboHub from "./ComboGuides";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(false);
  // 1. State variable to keep track of the user's login status
  const [loggedIn, setLoggedIn] = useState(false);

  // 3. Create a function to check if the user is logged in
  function checkLoggedInStatus() {
    const token = localStorage.getItem("token"); // or document.cookie, depending on your authentication strategy
    return token !== null && token !== undefined; // if token is present, return true; otherwise, return false
  }

  // 2. useEffect hook to check if the user is logged in when the component mounts
  useEffect(() => {
    const isLoggedIn = checkLoggedInStatus(); // call the function to check the login status
    setLoggedIn(isLoggedIn); // update the state variable with the result

    const visited = Cookies.get("visited");
    if (!visited) {
      Cookies.set("visited", "true", { expires: 7 });
      setShowWelcome(true);
    }
  }, []);

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
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {showWelcome ? <WelcomePage /> : <ComboHub />}
      </main>
    </>
  );
}
