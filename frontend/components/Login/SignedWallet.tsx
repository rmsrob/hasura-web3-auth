import Link from "next/link";
import { useEffect } from "react";
import { useAccount, useNetwork } from "wagmi";
import useStorage from "../../hooks/useStorage";
import { useAuth } from "./AuthProvider";
import Logout from "./Logout";
import Signin from "./Signin";

const SignedWallet = () => {
  const { getItem } = useStorage();
  const { signIn } = useAuth();
  const { address, isSignedIn } = useAuth();
  const [{ data: networkData, error: networkError }] = useNetwork();
  const [{ data: accountData }] = useAccount({
    fetchEns: true,
  });

  useEffect(() => {
    // ! need to re sign when we lost the sessions token
    // ! happend in "/"
    const isGraphQl = getItem("jwt", "session");
    if (!!isGraphQl === false && isSignedIn) signIn();
  }, []);

  return (
    <>
      {isSignedIn ? (
        <div>
          <div>
            Signed in as {address}{" "}
            <Link href={"/user"}>
              <a>user page</a>
            </Link>
          </div>
          <Logout />
        </div>
      ) : (
        !networkError &&
        accountData?.address &&
        networkData.chain && (
          <Signin
            address={accountData.address as string}
            chainId={networkData.chain.id as number}
          />
        )
      )}
    </>
  );
};

export default SignedWallet;
