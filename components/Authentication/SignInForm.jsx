import React, { useState } from "react";
import styles from "@/styles/Form.module.css";
import Image from "next/image";
import {
  handleSignInSubmit,
  handleSigninSuccess,
} from "./authUtils/authHandler";

const SignInForm = ({
  showSignupForm,
  showPassword,
  setShowPassword,
  onAuthenticationSuccess,
  setNotificationText,
}) => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    handleSignInSubmit(e, onAuthenticationSuccess);
    setNotificationText(
      <span>
        Sign-in<span style={{ color: "#93f367" }}> successful </span>
        Redirecting...
      </span>
    );
  };

  return (
    <form
      className={`${styles.signUp_form} ${
        showSignupForm ? styles.show : styles.hide
      }`}
      onSubmit={handleSubmit}
    >
      <span className={styles.errorMessage}>{<p>{errorMessage}</p>}</span>
      <div className={styles.label_wrapper}>
        <div>
          <span>USERNAME</span>
        </div>
        <label className={styles.username_label} htmlFor="username">
          <input
            className={styles.username_input}
            autoComplete="off"
            type="text"
            id="username"
            name="username"
            required
            placeholder="Enter your username"
          />
        </label>
      </div>

      <div className={styles.label_wrapper}>
        <div>
          <span>PASSWORD</span>
        </div>

        <div className={styles.password_container}>
          <label htmlFor="password" className={styles.password_label}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              className={styles.password_input}
            />
          </label>
          <button
            className={styles.passwordEye_btn}
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            <Image
              className={styles.eye_icon}
              src={
                showPassword
                  ? "/signUpPasswordEye.svg"
                  : "/signUpPasswordClosedEye.svg"
              }
              alt="eye"
              width={20}
              height={20}
            />
          </button>
        </div>
      </div>

      <button
        type="submit"
        className={styles.submit_btn}
        onClick={handleSigninSuccess}
      >
        SUBMIT
      </button>
    </form>
  );
};

export default SignInForm;
