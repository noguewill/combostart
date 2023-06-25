import { Auth } from "aws-amplify";

export const signIn = async (username, password) => {
  try {
    const user = await Auth.signIn(username, password);
    console.log("Sign-in successful");
    return user;
  } catch (error) {
    console.error("Sign-in error:", error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    await Auth.signOut();
    console.log("Sign-out successful");
  } catch (error) {
    console.error("Sign-out error:", error);
    throw error;
  }
};
