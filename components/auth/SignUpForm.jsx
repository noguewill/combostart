import React, { useState } from "react";
import styles from "@/styles/Form.module.css";
import Image from "next/image";
import ReCAPTCHA from "react-google-recaptcha";

const SignUpForm = ({
  showSignupForm,
  showPassword,
  setShowPassword,
  handleSignUpSubmit,
  errorState,
}) => {
  const [captchaVal, setCaptchaVal] = useState("");

  function getCaptchaVal(value) {
    setCaptchaVal(value);
  }

  return (
    <form
      className={`${styles.signUp_form} ${
        showSignupForm ? styles.show : styles.hide
      }`}
      onSubmit={handleSignUpSubmit}
    >
      <div className={styles.label_wrapper}>
        <span>Display Name</span>

        <label htmlFor="displayname">
          <input
            className={styles.username_input}
            type="text"
            id="displayname"
            name="displayname"
            placeholder="Min 4/Max 10 characters"
            required
          />
        </label>
        <span className={styles.errorMessage}>
          {errorState === "User already exists"
            ? "Display name already in use"
            : ""}
          {errorState ===
          "1 validation error detected: Value at 'Display name' failed to satisfy constraint: Member must satisfy regular expression pattern: [p{L}p{M}p{S}p{N}p{P}]+"
            ? "Invalid Display name, try again."
            : ""}
        </span>
      </div>
      <div className={styles.label_wrapper}>
        <span>Username</span>

        <label htmlFor="username">
          <input
            className={styles.username_input}
            autoComplete="off"
            type="text"
            id="username"
            name="username"
            placeholder="Maximum 10 characters"
            required
          />
        </label>
        <span className={styles.errorMessage}>
          {errorState === "User already exists"
            ? "Username already in use"
            : ""}
          {errorState ===
          "1 validation error detected: Value at 'username' failed to satisfy constraint: Member must satisfy regular expression pattern: [p{L}p{M}p{S}p{N}p{P}]+"
            ? "Invalid username, try again."
            : ""}
        </span>
      </div>

      <div className={styles.label_wrapper}>
        <span>E-mail</span>
        <label htmlFor="email" className={styles.signUp_label}>
          <input
            type="email"
            id="email"
            name="email"
            required
            className={styles.email_input}
          />
        </label>
      </div>

      <div className={styles.label_wrapper}>
        <span>Password</span>
        <div className={styles.password_container}>
          <label htmlFor="password" className={styles.password_label}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              placeholder="Minimum 8 characters"
              className={styles.password_input}
            />
            <span className={styles.errorMessage}>
              {errorState ===
              "Password did not conform with policy: Password not long enough"
                ? "Password not long enough."
                : ""}
            </span>
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
                  ? "/icons/signUpPasswordEye.svg"
                  : "/icons/signUpPasswordClosedEye.svg"
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
          required
        />
        <span className={styles.tos_text}>
          I Agree with COMBOSTART&apos;s
          <a
            className={styles.tos_link}
            href="https://www.combostart.vercel.app/Tos"
          >
            Terms of Service
          </a>
        </span>
      </label>

      <ReCAPTCHA sitekey={process.env.siteKey} onChange={getCaptchaVal} />

      <button
        type="submit"
        className={styles.submit_btn}
        disabled={captchaVal === ""}
      >
        SUBMIT
      </button>
    </form>
  );
};

export default SignUpForm;
