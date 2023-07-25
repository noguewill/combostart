import { Auth } from "aws-amplify";
import { storeToken } from "./tokenUtils";
import jwt from "jsonwebtoken";

export const handleSignInSubmit = async (e, setNotificationText) => {
  e.preventDefault();
  const username = e.target.username.value;
  const password = e.target.password.value;

  try {
    await Auth.signIn(username, password);
    console.log("Sign-in successful");
    setNotificationText(
      <span>
        Sign-in<span style={{ color: "#93f367" }}> successful </span>
        Redirecting...
      </span>
    );

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
    setNotificationText("Error:", error.message);
  }
};
