import Head from "next/head";
import styles from "@/styles/Home.module.css";
import WelcomePage from "./WelcomePage";
import ComboGuides from "./ComboGuides";
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
        {/*         <div className={styles.mobileMessage}>
          <h3 style={{ fontSize: "2rem" }}>Hello!</h3>
          <p>
            <br />
            The mobile version of this website is still in{" "}
            <strong>development</strong>,
            <br />
            please access this website on your PC.
          </p>
          <Image
            src="/logo.svg"
            alt="Combostart logo"
            width={50}
            height={50}
            style={{ marginTop: "2rem" }}
          />
        </div> */}
        {showWelcome ? <WelcomePage /> : <ComboGuides />}
      </main>
    </>
  );
}
