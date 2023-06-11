import Head from "next/head";
import styles from "@/styles/Home.module.css";
import WelcomePage from "./WelcomePage";
import ComboHub from "./ComboHub";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { Amplify } from "aws-amplify";
/* import awsconfig from "src/aws-exports.js"; */
/* Amplify.configure(awsconfig); */

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

  useEffect(() => {
    // Set the necessary AWS Amplify configuration
    Amplify.configure({
      aws_project_region: process.env.AWS_PROJECT_REGION,
      aws_cognito_identity_pool_id: process.env.AWS_COGNITO_IDENTITY_POOL_ID,
      aws_cognito_region: process.env.AWS_COGNITO_REGION,
      aws_user_pools_id: process.env.AWS_USER_POOLS_ID,
      aws_user_pools_web_client_id: process.env.AWS_USER_POOLS_WEB_CLIENT_ID,
      oauth: {},
      aws_cognito_username_attributes: [],
      aws_cognito_social_providers: [],
      aws_cognito_signup_attributes: ["EMAIL"],
      aws_cognito_mfa_configuration: "OFF",
      aws_cognito_mfa_types: ["SMS"],
      aws_cognito_password_protection_settings: {
        passwordPolicyMinLength: 8,
        passwordPolicyCharacters: [],
      },
      aws_cognito_verification_mechanisms: ["EMAIL"],
    });
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
