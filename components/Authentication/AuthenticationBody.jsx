import React, { useState } from "react";
import styles from "@/styles/Login.module.css";
import Image from "next/image";
import Form from "./Form";

const AuthenticationBody = ({ toggleOverlay, onAuthenticationSuccess }) => {
  const [showSignupForm, setShowSignupForm] = useState(true);
  const [signIn, setSignIn] = useState(false);
  const [notificationText, setNotificationText] = useState("");

  return (
    <div className={styles.login_parent}>
      <div
        className={styles.notificationMessage_container}
        style={
          notificationText === ""
            ? { visibility: "hidden" }
            : { visibility: "visible" }
        }
      >
        <h4 className={styles.notificationMessage}>{notificationText}</h4>
      </div>
      <div className={styles.login_body}>
        {/* Button when clicked closes the modal */}
        <button className={styles.close_btn} onClick={toggleOverlay}>
          x
        </button>
        {/* Sign Up/In Logo */}
        <div className={styles.signUp_header_wrapper}>
          <div className={styles.signUp_logo}>
            <Image
              src="/logo.svg"
              alt="combostart logo"
              width={60}
              height={40}
            />
          </div>
        </div>

        {/* Sign Up and Sign In Form */}
        <Form
          signIn={signIn}
          setSignIn={setSignIn}
          showSignupForm={showSignupForm}
          toggleOverlay={toggleOverlay}
          onAuthenticationSuccess={onAuthenticationSuccess}
          setNotificationText={setNotificationText}
        />

        {/* If signIn state is true shows "Go back to sign up" if it's not, it shows "Already have an account?" */}
        <span className={styles.signIn_text}>
          <span>
            {signIn ? "Go back to sign up" : "Already have an account?"}
          </span>

          {signIn ? (
            <a className={styles.signIn_link} onClick={() => setSignIn(false)}>
              Sign Up
            </a>
          ) : (
            <a className={styles.signIn_link} onClick={() => setSignIn(true)}>
              Sign in
            </a>
          )}
        </span>
      </div>
    </div>
  );
};

export default AuthenticationBody;
