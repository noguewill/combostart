import React from "react";
import { useState } from "react";
import styles from "@/styles/Login.module.css";
import Image from "next/image";
import Form from "./Form";

const AuthenticationBody = ({ toggleOverlay, onAuthenticationSuccess }) => {
  const [showSignupForm, setShowSignupForm] = useState(true);
  const [signIn, setSignIn] = useState(false);
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  const handleStatusMessaging = () => {
    if (status === "verify") {
      return (
        <>
          <span>
            {" "}
            Youve <span style={{ color: "#93f367" }}>successfully</span> signed
            up! Redirecting...
          </span>
        </>
      );
    } else if (status === "success") {
      return (
        <>
          <span>
            {" "}
            Successful sign-up! Check your e-mail to
            <span style={{ color: "#eee345" }}> verify </span>
            your account and complete your account creation.
          </span>
        </>
      );
    } else {
      return (
        <>
          <span>
            {" "}
            An <span style={{ color: "#f54848" }}> error</span> has occurred.
            Please try again later. Error #3309
          </span>
        </>
      );
    }
  };

  return (
    <div className={styles.login_parent}>
      <div
        className={styles.notificationMessage_container}
        style={{ visibility: "hidden" }}
      >
        <h4 className={styles.notificationMessage}>{message}</h4>
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
          showSignupForm={showSignupForm}
          toggleOverlay={toggleOverlay}
          onAuthenticationSuccess={onAuthenticationSuccess}
          setStatus={setStatus}
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
