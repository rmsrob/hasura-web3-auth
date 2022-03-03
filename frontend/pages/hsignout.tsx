import { useEffect } from "react";
import { useUser_SignoutMutation } from "../graphql/generated/graphql";
import useStorage from "../hooks/useStorage";

const SignOut = () => {
  const { setItem } = useStorage();
  const [signOut] = useUser_SignoutMutation();

  useEffect(() => {
    // Clear the JWT and refresh token so that Apollo doesn't try to use them
    setItem("jwt", "", "session");
    setItem("refreshToken", "", "session");
    // Hit the signout endpoint to clear the fingerprint cookie
    // Tell Apollo to reset the store
    // Finally, redirect the user to the home page
    signOut().then((e) => {
      console.log(e.data?.signout);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signOut]);

  return <p>Signing out...</p>;
};

export default SignOut;
