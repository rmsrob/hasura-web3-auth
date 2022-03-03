import { useAccount, useNetwork } from "wagmi";
import { useAuth } from "./AuthProvider";
import Logout from "./Logout";
import Signin from "./Signin";

const SignedWallet = () => {
  const { address, isSignedIn } = useAuth();
  const [{ data: networkData, error: networkError }] = useNetwork();
  const [{ data: accountData }] = useAccount({
    fetchEns: true,
  });

  return (
    <>
      {isSignedIn ? (
        <div>
          <div>Signed in as {address}</div>
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
