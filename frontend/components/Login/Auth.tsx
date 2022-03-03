import { useAccount } from "wagmi";
import ConnectedWallet from "./ConnectedWallet";
import SignedWallet from "./SignedWallet";

const Auth = () => {
  const [{ data: accountData }] = useAccount({
    fetchEns: true,
  });

  return (
    <>
      {accountData && (
        <>
          {/* if user connect a wallet then show the wallet info  */}
          <ConnectedWallet />
          {/* if context got address then show sign  */}
          <SignedWallet />
        </>
      )}
    </>
  );
};

export default Auth;
