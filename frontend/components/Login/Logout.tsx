import { useAuth } from "./AuthProvider";

const Logout = () => {
  const { signOut } = useAuth();
  return (
    <>
      <button onClick={signOut}>Sign Out</button>
    </>
  );
};

export default Logout;
