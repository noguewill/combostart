import React, { useState } from "react";
import styles from "@/styles/Form.module.css";
import Image from "next/image";
/* import { signIn } from "./authUtils/authHandler"; */
/* import { storeToken } from "./authUtils/tokenUtils"; */
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";

const storeToken = async (token, expirationTime) => {
  const client = new DynamoDBClient({
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  const params = {
    TableName: "TokenId",
    Item: {
      userToken: { S: token },
      expirationTime: { N: expirationTime.toString() },
    },
  };

  try {
    await client.send(new PutItemCommand(params));
    console.log("Token stored successfully");
  } catch (error) {
    console.error("Error storing token:", error);
    throw error;
  }
};

const SignInForm = ({
  showSignupForm,
  showPassword,
  setShowPassword,
  onAuthenticationSuccess,
}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const signIn = async (username, password) => {
    try {
      const user = await Auth.signIn(username, password);
      console.log("Sign-in successful");
      return user;
    } catch (error) {
      console.error("Sign-in error:", error.message);
      const message = error.message;
      setErrorMessage(message);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const user = await signIn(username, password);
      const session = await Auth.currentSession();
      const idToken = session.getIdToken().getJwtToken();

      // Verify the JWT token
      const decodedToken = jwt.decode(idToken);
      if (decodedToken && decodedToken.exp) {
        // Get the token expiration timestamp
        const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds

        // Store the session token in DynamoDB
        await storeToken(idToken, expirationTime);

        // Redirect to the desired page
        router.push("/");
      } else {
        console.error("Invalid token");
      }
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
      <span className={styles.errorMessage}>{<p>{errorMessage}</p>}</span>
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
                  ? "/signUpPasswordEye.svg"
                  : "/signUpPasswordClosedEye.svg"
              }
              alt="eye"
              width={20}
              height={20}
            />
          </button>
        </div>
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
