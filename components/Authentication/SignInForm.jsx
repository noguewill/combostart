import styles from "@/styles/Form.module.css";
import Image from "next/image";
import { signIn } from "./authUtils/authHandler";
import { storeToken } from "./authUtils/tokenUtils";
import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";

const SignInForm = ({
  showSignupForm,
  showPassword,
  setShowPassword,
  onAuthenticationSuccess,
}) => {
  const router = useRouter();
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [sessionToken, setSessionToken] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await signIn(username, password);
      const session = await Auth.currentSession();
      const idToken = session.getIdToken().getJwtToken();
      setSessionToken(idToken);

      // Store the session token
      await storeToken(idToken);
      router.push("/ComboHub");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSigninSuccess = () => {
    // Call the onAuthenticationSuccess callback from props
    if (typeof onAuthenticationSuccess === "function") {
      onAuthenticationSuccess();
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
            id="signIn_username_input"
            className={styles.username_input}
            type="text"
            name="username"
            value={username}
            placeholder="Enter your username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
      </div>

      <div className={styles.label_wrapper}>
        <div>
          <span>PASSWORD</span>
        </div>

        {showPassword ? (
          <>
            <label
              id="signIn_password_input"
              htmlFor="password"
              className={styles.password_label}
            >
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
