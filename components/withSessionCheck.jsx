import { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import { awsmobile } from "./Authentication/amplifyHandler";

const withSessionCheck = (WrappedComponent) => {
  const SessionCheckWrapper = (props) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
      awsmobile;
      const checkAuth = async () => {
        try {
          const user = await Auth.currentAuthenticatedUser();
          // Session is active, the user is authenticated
          setCurrentUser(user);
        } catch (error) {
          // No active session, redirect to the sign-in page
          console.log(error);
        }
      };

      checkAuth();
    }, []);

    return <WrappedComponent {...props} currentUser={currentUser} />;
  };

  return SessionCheckWrapper;
};

export default withSessionCheck;
