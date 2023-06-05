import React from "react";
import { useState } from "react";
import styles from "@/styles/Form.module.css";
import Image from "next/image";
import SignupOptions from "./SignupOptions";

const Form = ({ toggleOverlay, showSignupForm, signIn }) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the form data
  };

  return (
    <>
      {/* THE FORM */}
      {signIn ? (
        <SignupOptions />
      ) : (
        <>
          <form
            className={`${styles.signUp_form} ${
              showSignupForm ? styles.show : styles.hide
            }`}
            onSubmit={handleSubmit}
          >
            <span className={styles.signUp_notice}>
              (Fields marked with an <span style={{ color: "red" }}>*</span> are
              required)
            </span>
            <div className={styles.label_wrapper}>
              <div>
                <span> USERNAME</span>
                <span className={styles.required_asterisk}>*</span>
              </div>
              <label className={styles.username_label} htmlFor="username">
                <input
                  className={styles.username_input}
                  type="text"
                  id="username"
                  name="username"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <button className={styles.username_hoverBtn}>
                <Image
                  style={{ left: "8.5rem" }}
                  className={styles.exclamation_icon}
                  src="/signUpExclamation.svg"
                  alt="eye"
                  width={20}
                  height={20}
                />
              </button>

              <div className={styles.username_dialog}>
                <p style={{ width: "12rem" }}>
                  Username must contain:
                  <br />
                  <span style={{ fontWeight: "700" }}>
                    -From 5 to 12 characters
                  </span>
                  <br />
                  <span style={{ fontWeight: "700" }}>
                    -Symbols not supported:
                    <br />
                    (e.g: &quot;@ # $ !&quot;)
                  </span>
                </p>
              </div>
            </div>

            <div className={styles.label_wrapper}>
              <div>
                <span> E-MAIL</span>
                <span className={styles.required_asterisk}>*</span>
              </div>
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
              <div>
                <span>PASSWORD</span>
                <span className={styles.required_asterisk}>*</span>
              </div>

              {showPassword ? (
                <>
                  <label htmlFor="password" className={styles.password_label}>
                    <input
                      type="text"
                      name="password"
                      value={password}
                      required
                      onChange={(e) => setPassword(e.target.value)}
                      className={styles.password_input}
                    />
                  </label>
                </>
              ) : (
                <>
                  <label htmlFor="password" className={styles.password_label}>
                    <input
                      type="password"
                      name="password"
                      value={password}
                      required
                      onChange={(e) => setPassword(e.target.value)}
                      className={styles.password_input}
                    />
                  </label>
                </>
              )}

              <button
                className={styles.passwordEye_btn}
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                <Image
                  className={styles.exclamation_icon}
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
              <button className={styles.password_hoverBtn}>
                <Image
                  style={{ left: "12rem" }}
                  className={styles.exclamation_icon}
                  src="/signUpExclamation.svg"
                  alt="eye"
                  width={20}
                  height={20}
                />
              </button>
              <div className={styles.dialog}>
                <p style={{ width: "12rem" }}>
                  Password must contain:
                  <br />
                  <span style={{ fontWeight: "700" }}>
                    -From 7 to 12 characters
                  </span>
                  <br />
                  <span style={{ fontWeight: "700" }}>-Uppercase Letter</span>
                  <br />
                  <span style={{ fontWeight: "700" }}>
                    -Symbol:(e.g: &quot;@ # $ !&quot;)
                  </span>
                  <br />
                  <span style={{ fontWeight: "700" }}>-Number</span>
                </p>
              </div>
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
                  href="https://www.combostart.com/terms-of-service"
                >
                  Terms of Service
                </a>
                <span className={styles.required_asterisk}>*</span>
              </span>
            </label>

            <button type="submit" className={styles.submit_btn}>
              SUBMIT
            </button>
          </form>
        </>
      )}
    </>
  );
};

export default Form;
