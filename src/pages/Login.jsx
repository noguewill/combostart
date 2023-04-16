import React from "react";
import { useState } from "react";
import styles from "@/styles/Login.module.css";
import Image from "next/image";
import Form from "./Form";
const Login = ({ toggleOverlay }) => {
  const [showSignupForm, setShowSignupForm] = useState(false);
  return (
    <div className={styles.login_parent}>
      <div className={styles.login_body}>
        {/* Button when clicked closes the modal */}
        <button className={styles.close_btn} onClick={toggleOverlay}>
          x
        </button>
        {/* Sign Up/In Logo */}
        <div className={styles.signUp_header_wrapper}>
          <div className={styles.signUp_logo}>
            <Image
              src="/logo.png"
              alt="combostart logo"
              width={70}
              height={50}
            />
          </div>
        </div>

        {/* Sign Up Form */}
        {showSignupForm ? (
          <Form toggleOverlay={toggleOverlay} />
        ) : (
          <>
            <h3 className={styles.signUp_message}>Sign up and join us!</h3>
            <div className={styles.signOption_wrapper}>
              {/* Sign Up with your E-mail */}
              <button
                className={styles.signOption_btn}
                onClick={() => setShowSignupForm(true)}
              >
                <span>Sign Up with E-mail</span>
                <div className={styles.signOptionIcon}>
                  <Image
                    src="/logo.png"
                    alt="combostart logo"
                    width={26}
                    height={26}
                  />
                </div>
              </button>
              {/* Sign Up using your Google account */}
              <button className={styles.signOption_btn}>
                <span>Sign Up with Google</span>
                <div
                  className={styles.signOptionIcon}
                  style={{ backgroundColor: "white" }}
                >
                  <Image
                    src="/googleIcon.svg"
                    alt="Google logo"
                    width={26}
                    height={26}
                  />
                </div>
              </button>
              {/* Sign up using your Steam account */}
              <button className={styles.signOption_btn}>
                <span>Sign Up with Steam</span>
                <div
                  className={styles.signOptionIcon}
                  style={{ backgroundColor: "rgb(43, 108, 154)  " }}
                >
                  {" "}
                  <Image
                    src="/steamIcon.svg"
                    alt="Steam logo"
                    width={26}
                    height={26}
                  />
                </div>
              </button>
              {/* Sign up using your Discord account */}
              <button className={styles.signOption_btn}>
                <span>Sign Up with Discord</span>
                <div
                  className={styles.signOptionIcon}
                  style={{ backgroundColor: "#7289DA" }}
                >
                  {" "}
                  <Image
                    src="/discordIcon.svg"
                    alt="Discord logo"
                    width={26}
                    height={26}
                  />
                </div>
              </button>
              {/* Sign up using your Xbox account */}
              <button className={styles.signOption_btn}>
                <span>Sign Up with Xbox Live</span>
                <div
                  className={styles.signOptionIcon}
                  style={{ backgroundColor: "green" }}
                >
                  {" "}
                  <Image
                    src="/xboxIcon.svg"
                    alt="Xbox logo"
                    width={26}
                    height={26}
                  />
                </div>
              </button>
              {/* Sign up using your Playstation account */}
              <button className={styles.signOption_btn}>
                <span>Sign Up with Playstation Network</span>
                <div
                  className={styles.signOptionIcon}
                  style={{ backgroundColor: "#003087 " }}
                >
                  {" "}
                  <Image
                    src="/playstationIcon.svg"
                    alt="Playstation logo"
                    width={26}
                    height={26}
                  />
                </div>
              </button>
              <span>OR</span>
            </div>
            {/* Sign In Notice */}
          </>
        )}
        <span className={styles.signIn_text}>
          {showSignupForm ? (
            <>
              {" "}
              <span>Go back to the other sign up options</span> <br />{" "}
              <span>Already have an account?</span>
            </>
          ) : (
            <span>Already have an account?</span>
          )}
          <a href="/" className={styles.signIn_link}>
            Sign in
          </a>
        </span>
      </div>
    </div>
  );
};

export default Login;
