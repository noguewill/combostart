import React from "react";
import styles from "@/styles/Form.module.css";
import Image from "next/image";
import { handleSignInSubmit } from "../../logic/authUtils/authHandler";

const SignInForm = ({
  showSignupForm,
  showPassword,
  setShowPassword,
  setNotificationText,
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from submitting normally

    try {
      await handleSignInSubmit(e, setNotificationText);

      // Optional: You can add additional logic here after successful sign-in
    } catch (error) {
      setNotificationText("An error occurred. Please try again."); // Set the error message
    }
  };

  return (
    <form
      className={`${styles.signUp_form} ${
        showSignupForm ? styles.show : styles.hide
      }`}
      onSubmit={handleSubmit}
    >
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
                  ? "/icons/signUpPasswordEye.svg"
                  : "/icons/signUpPasswordClosedEye.svg"
              }
              alt="eye"
              width={20}
              height={20}
            />
          </button>
        </div>
      </div>

      <button type="submit" className={styles.submit_btn}>
        SUBMIT
      </button>
    </form>
  );
};

export default SignInForm;
