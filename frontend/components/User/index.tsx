import {
  useUser_NftsQuery,
  useUser_PoapsQuery,
  useUser_TokensQuery,
} from "../../graphql/generated/graphql";
import UserNfts from "./UserNfts";
import UserPoaps from "./UserPoaps";
import UserTokens from "./UserTokens";

const User = (props: { user: any }) => {
  const { user } = props;
  const {
    data: getToken,
    loading: loadingToken,
    error: errToken,
  } = useUser_TokensQuery({
    variables: {
      address: "0x123",
      chainId: "eth",
    },
  });

  const {
    data: getNft,
    loading: loadingNft,
    error: errNft,
  } = useUser_NftsQuery({
    variables: {
      address: "0x123",
      chainId: "eth",
    },
  });

  const {
    data: getPoap,
    loading: loadingPoap,
    error: errPoap,
  } = useUser_PoapsQuery({
    variables: {
      address: "0x123",
    },
  });

  console.log("err", errToken, "loading", loadingToken, "data", getToken);
  console.log("err", errNft, "loading", loadingNft, "data", getNft);
  console.log("err", errPoap, "loading", loadingPoap, "data", getPoap);

  return (
    <div>
      <h1>User Page</h1>
      {getToken && <UserTokens tokens={getToken.userTokens} />}
      {getNft && <UserNfts nfts={getNft.userNfts} />}
      {getPoap && <UserPoaps pops={getPoap.userPoaps} />}
    </div>
  );
};
export default User;
