import React from "react";
import { useState } from "react";
import styles from "@/styles/Login.module.css";
import Image from "next/image";
import Form from "./Form";
import SignupOptions from "./SignupOptions";
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
              width={60}
              height={40}
            />
          </div>
        </div>

        {/* Sign Up Form */}
        {showSignupForm ? (
          <Form toggleOverlay={toggleOverlay} showSignupForm={showSignupForm} />
        ) : (
          <SignupOptions setShowSignupForm={setShowSignupForm} />
        )}

        <span className={styles.signIn_text}>
          {showSignupForm ? (
            <>
              <span
                className={styles.backToOptions}
                onClick={() => setShowSignupForm(!showSignupForm)}
              >
                Go back to the other sign up options
              </span>
              <br />
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
