import { useAuth } from "./AuthProvider";

const Signin = (props: any) => {
  const { signIn } = useAuth();

  return <button onClick={signIn}>Sign-In with Ethereum</button>;
};

export default Signin;
