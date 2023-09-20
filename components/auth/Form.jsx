import React, { useState } from "react";
import styles from "@/styles/Form.module.css";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import { Auth } from "aws-amplify";
import ReCAPTCHA from "react-google-recaptcha";

const Form = ({ showSignupForm, signIn, setSignIn, setNotificationText }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [username, setUsername] = useState("");
  const [verficationComplete, setVerificationComplete] = useState(false);
  const [captchaVal, setCaptchaVal] = useState("");

  let captchaTimeout;

  function getCaptchaVal(value) {
    // Clear any existing timeout to prevent immediate execution
    if (captchaTimeout) {
      clearTimeout(captchaTimeout);
    }

    // Set a new timeout of 1 second (1000 milliseconds)
    captchaTimeout = setTimeout(() => {
      setCaptchaVal(value);
    }, 1000);
  }

  /* Disables verify button when there's less than 6 digits on it's input */
  const isButtonActive = verificationCode.length === 6;

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();

    const DisplayName = e.target.displayname.value;
    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await Auth.signUp({
        username,
        password,
        attributes: {
          email,
          "custom:DisplayName": DisplayName,
        },
      });

      setUsername(username); // Set the username state
      // Proceed with sending the confirmation code to the user's email
      setNotificationText(
        "Confirm the verification of your account by entering the code that you received on your e-mail."
      );
      setShowVerifyModal(true);
    } catch (error) {
      // Handle sign-up error
      setNotificationText(error.message);
      console.error("Error signing up:", error);
    }
  };

  async function resendConfirmationCode() {
    try {
      await Auth.resendSignUp(username);
      setNotificationText(<span>Code sent! Check your e-mail</span>);
    } catch (err) {
      setNotificationText("Error resending code:", err.message);
      console.error("error resending code: ", err);
    }
  }

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    try {
      await Auth.confirmSignUp(username, verificationCode);
      setVerificationComplete(true);
      setNotificationText(
        <span>
          Account<span style={{ color: "#93f367" }}> confirmed</span>! Enter
          your credentials to continue to Combostart.
        </span>
      );
      setSignIn(true);
    } catch (error) {
      setNotificationText(error.message);
      console.error("Error confirming sign-up:", error);
    }
  };

  const handleVerificationCodeChange = (e) => {
    const input = e.target.value;
    const regex = /^[0-9]{0,6}$/; // Only allow numbers with maximum length of 6
    if (regex.test(input)) {
      setVerificationCode(input);
    }
  };

  return (
    <>
      {captchaVal !== "" ? (
        <>
          {signIn ? (
            <SignInForm
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              showSignupForm={showSignupForm}
              setNotificationText={setNotificationText}
            />
          ) : !showVerifyModal ? (
            <SignUpForm
              showSignupForm={showSignupForm}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              handleSignUpSubmit={handleSignUpSubmit}
            />
          ) : (
            <form
              className={styles.verificationCode_container}
              onSubmit={handleVerificationSubmit}
            >
              <h4>Almost there!</h4>
              <h2>Enter your verification code</h2>
              <input
                className={styles.verificationCode_input}
                type="text"
                value={verificationCode}
                onChange={handleVerificationCodeChange}
                placeholder="000000"
                required
              />
              <div className={styles.resendVerificationCode_notice}>
                <span>Did not arrive?</span>
                <button
                  type="button"
                  className={styles.resendCode_btn}
                  onClick={resendConfirmationCode}
                >
                  Resend code
                </button>
              </div>
              {isButtonActive ? (
                <button className={styles.submit_btn} type="submit">
                  VERIFY
                </button>
              ) : (
                <button
                  className={styles.submit_btn_inactive}
                  type="button"
                  disabled
                >
                  VERIFY
                </button>
              )}
            </form>
          )}
        </>
      ) : (
        <>
          <h4 className={styles.captchaHeader}>Are you a human?</h4>
          <ReCAPTCHA sitekey={process.env.siteKey} onChange={getCaptchaVal} />
        </>
      )}
    </>
  );
};

export default Form;
