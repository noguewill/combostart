import { Auth } from "aws-amplify";
import { useState } from "react";
import styles from "@/styles/Form.module.css";

const VerificationModal = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [username, setUsername] = useState(""); // Add a state for the username

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    try {
      await Auth.confirmSignUp(username, verificationCode); // Provide the username in the confirmSignUp call
      console.log("Success");
    } catch (error) {
      console.log("Error confirming sign-up:", error);
    }
  };

  return (
    <div>
      <h2>Enter Your Verification Code</h2>
      <form onSubmit={handleVerificationSubmit}>
        <input
          type="text"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          placeholder="0 0 0 0 0 0"
          required
        />

        <button className={styles.submit_btn} type="submit">
          VERIFY
        </button>
      </form>
    </div>
  );
};

export default VerificationModal;
