import { useEffect, useState } from "react";
import { useConnect } from "wagmi";
import { useIsMounted } from "../../hooks/isMounted";
import { useAuth } from "./AuthProvider";

const Connect = () => {
  const isMounted = useIsMounted();
  const [{ data: connectData, error: connectError }, connect] = useConnect();
  const { signIn } = useAuth();
  const [shouldSignIn, setShouldSignIn] = useState(false);
  useEffect(() => {
    if (!shouldSignIn) return;
    signIn();
    setShouldSignIn(false);
  }, [shouldSignIn, signIn]);

  return (
    <>
      {connectData.connectors.map((x, k) => {
        return (
          <button
            disabled={isMounted ? !x.ready : false}
            key={x.id}
            onClick={() => connect(x).then(() => setShouldSignIn(true))}
          >
            {isMounted ? x.name : x.id === "injected" ? x.id : x.name}
            {isMounted ? !x.ready && " (unsupported)" : ""}
          </button>
        );
      })}
      {connectError && (
        <div>{connectError?.message ?? "Failed to connect"}</div>
      )}
    </>
  );
};

export default Connect;
