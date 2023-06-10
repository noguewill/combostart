import React from "react";
import { useState } from "react";
import styles from "@/styles/Login.module.css";
import Image from "next/image";
import Form from "./Form";

const Login = ({ toggleOverlay, handleVerificationSuccess }) => {
  const [showSignupForm, setShowSignupForm] = useState(true);
  const [signIn, setSignIn] = useState(false);

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
          handleVerificationSuccess={handleVerificationSuccess}
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

export default Login;
