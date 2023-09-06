import { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import { awsmobile } from "./Authentication/amplifyHandler";
import { useRouter } from "next/router";

const withAuth = (WrappedComponent) => {
  const AuthCheck = (props) => {
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
      awsmobile;
      Auth.currentAuthenticatedUser()
        .then((user) => {
          setUser(user);
        })
        .catch((err) => {
          router.push("/");
          console.error(err);
          setUser(null);
        });
    }, []);

    if (!user) {
      return null; // Return null when user is not authenticated
    }

    return <WrappedComponent {...props} user={user} />;
  };

  return AuthCheck;
};

export default withAuth;
