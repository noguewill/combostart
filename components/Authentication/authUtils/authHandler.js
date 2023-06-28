import { Auth } from "aws-amplify";
import { storeToken } from "./tokenUtils";
import jwt from "jsonwebtoken";

export const signIn = async (username, password) => {
  try {
    const user = await Auth.signIn(username, password);
    console.log("Sign-in successful");
    return user;
  } catch (error) {
    console.error("Sign-in error:", error.message);
    throw error;
  }
};

export const handleSignInSubmit = async (e, onAuthenticationSuccess) => {
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
      window.location.reload(); // Refresh the page
    } else {
      console.error("Invalid token");
    }
  } catch (error) {
    console.log(error);
  }

  handleSigninSuccess(onAuthenticationSuccess);
};

export const handleSigninSuccess = (onAuthenticationSuccess) => {
  // Call the onAuthenticationSuccess callback
  if (typeof onAuthenticationSuccess === "function") {
    onAuthenticationSuccess();
  }
};
