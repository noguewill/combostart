import React from "react";
import styles from "@/styles/Form.module.css";
import Image from "next/image";

const SignUpForm = ({
  showSignupForm,
  showPassword,
  setShowPassword,
  handleSignUpSubmit,
}) => {
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

      <button type="submit" className={styles.submit_btn}>
        SUBMIT
      </button>
    </form>
  );
};

export default SignUpForm;
