import React from "react";
import styles from "@/styles/Login.module.css";
const Login = ({ toggleOverlay }) => {
  return (
    <>
      {/* Create a classname for every single element in this page */}
      <div className={styles.login_parent}>
        <div className={styles.login_body}>
          <button className={styles.close_btn} onClick={toggleOverlay}>
            x
          </button>
          <h2 className={styles.signUp_btn}>
            <span className={styles.signUp_logo}>COMBOSTART</span> Registration
            form
          </h2>
          <span>(Fields marked with an * are required)</span>
          <form className={styles.signUp_form}>
            <label className={styles.username_label} htmlFor="username">
              USERNAME
              <input
                className={styles.username_input}
                type="text"
                id="username"
                name="username"
                required
              />
            </label>
            <label htmlFor="email" className={styles.signUp_label}>
              E-MAIL
              <input
                type="email"
                id="email"
                name="email"
                required
                className={styles.email_input}
              />
            </label>
            {/*             <label htmlFor="retype-email" className={styles.signUp_label}>
              RE-TYPE Email
              <input
                type="email"
                id="retype-email"
                name="retype-email"
                required
                className={styles.email_input}
              />
            </label> */}
            <label htmlFor="password" className={styles.password_label}>
              PASSWORD
              <input
                type="password"
                id="password"
                name="password"
                required
                className={styles.password_input}
              />
            </label>
            {/*             <label htmlFor="retype-password" className={styles.password_label}>
              RE-TYPE Password
              <input
                type="password"
                id="retype-password"
                name="retype-password"
                required
                className={styles.password_input}
              />
            </label> */}
            <button type="submit" className={styles.submit_btn}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
