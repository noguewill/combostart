import React, { useState } from "react";
import styles from "@/styles/Form.module.css";
import Image from "next/image";

const SignUpForm = ({
  showSignupForm,
  showPassword,
  setShowPassword,
  handleSignUpSubmit,
  errorState,
}) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleEmailChange = (event) => {
    const email = event.target.value;
    setEmail(email);
    setEmailError(validateEmail(email));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;
    if (!email) {
      return "Email is required";
    }
    if (!emailRegex.test(email)) {
      return "Invalid email format or domain";
    }
    return "";
  };

  return (
    <form
      className={`${styles.signUp_form} ${
        showSignupForm ? styles.show : styles.hide
      }`}
      onSubmit={handleSignUpSubmit}
    >
      <h3 style={{ textAlign: "center" }}>Create a COMBOSTART account</h3>
      <h2>{errorState}</h2>
      <div className={styles.label_wrapper}>
        <div>
          <span> Username</span>
        </div>
        <label htmlFor="username">
          <input
            className={styles.username_input}
            type="text"
            id="username"
            name="username"
            required
          />
        </label>
        {errorState === "Username is already in use" ? (
          <span className={styles.usernameExistNotice}>
            This username is already in use.
          </span>
        ) : null}
      </div>

      <div className={styles.label_wrapper}>
        <div>
          <span>E-mail</span>
        </div>
        <label htmlFor="email" className={styles.signUp_label}>
          <input
            type="email"
            id="email"
            name="email"
            required
            className={`${styles.email_input} ${
              emailError ? styles.error : ""
            }`}
            onChange={handleEmailChange}
            value={email}
          />
        </label>
        {emailError && (
          <span className={styles.error_message}>{emailError}</span>
        )}
      </div>

      <div className={styles.label_wrapper}>
        <div>
          <span>Password</span>
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

        <span className={styles.password_notice}></span>
      </div>

      <label className={styles.tos_label} htmlFor="terms-checkbox">
        <input
          className={styles.tos_checkbox}
          type="checkbox"
          id="terms-checkbox"
        />
        <span className={styles.tos_text}>
          I Agree with COMBOSTART&apos;s
          <a
            className={styles.tos_link}
            href="https://www.combostart.vercel.app/terms-of-service"
          >
            Terms of Service
          </a>
        </span>
      </label>

      <button type="submit" className={styles.submit_btn}>
        SUBMIT
      </button>
    </form>
  );
};

export default SignUpForm;
