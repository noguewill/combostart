import { Auth } from "aws-amplify";
import { useState } from "react";
import styles from "@/styles/Form.module.css";
import Image from "next/image";

const VerificationModal = ({
  newEmail,
  notificationText,
  setNotificationText,
  emailEditMode,
}) => {
  const [verificationCode, setVerificationCode] = useState("");
  const [username, setUsername] = useState("");

  /* Disables verify button when there's less than 6 digits on it's input */
  const isButtonActive = verificationCode.length === 6;

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();

    await Auth.currentAuthenticatedUser();
    if (emailEditMode) {
      // User wants to change the current e-mail
      try {
        await Auth.verifyCurrentUserAttributeSubmit("email", verificationCode);
        console.log("Email verification success");
        setNotificationText("E-mail verified!");
        window.location.reload();
      } catch (error) {
        console.log(newEmail, verificationCode);
        setNotificationText("Error: " + error.message);
        console.log("Email verification failed with error ye", error);
      }
    } else {
      // User wants to sign-up for the first time
      try {
        await Auth.confirmSignUp(username, verificationCode); // Provide the username in the confirmSignUp call
        console.log("Success ye");
      } catch (error) {
        console.log("Error confirming sign-up:", error);
      }
    }
  };

  const handleVerificationCodeChange = (e) => {
    const input = e.target.value;
    const regex = /^[0-9]{0,6}$/; // Only allow numbers with maximum length of 6
    if (regex.test(input)) {
      setVerificationCode(input);
    }
  };

  async function resendConfirmationCode() {
    e.preventDefault();
    try {
      await Auth.resendSignUp(username);
      setNotificationText(<span>Code sent! Check your e-mail</span>);
    } catch (err) {
      setNotificationText("Error resending code:", err.message);
      console.log("error resending code: ", err);
    }
  }

  return (
    <div className={styles.login_parent}>
      <div
        className={styles.notificationMessage_container}
        style={
          notificationText === ""
            ? { visibility: "hidden" }
            : { visibility: "visible" }
        }
      >
        <h4 className={styles.notificationMessage}>{notificationText}</h4>
      </div>
      <div className={styles.login_body}>
        {/* Sign Up/In Logo */}
        <div className={styles.signUp_header_wrapper}>
          <div className={styles.signUp_logo}>
            <Image
              src="/logo.svg"
              alt="combostart logo"
              width={60}
              height={40}
            />
          </div>
        </div>
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
      </div>
    </div>
  );
};

export default VerificationModal;
