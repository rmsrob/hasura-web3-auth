import decodeJWT, { JwtPayload } from "jwt-decode";
import { useUser_Refresh_TokenQuery } from "../graphql/generated/graphql";
import useStorage from "../hooks/useStorage";
// import { makeTokenRefreshLink } from "../libs/apollo-token-refresh-link";

const RefreshToken = () => {
  //   const myRefreshToken = makeTokenRefreshLink();
  const { getItem } = useStorage();

  const refreshToken = getItem("refreshToken", "session");
  console.log("refreshToken", refreshToken);

  if (!refreshToken) return true;
  const jwt = getItem("jwt", "session");
  const claims: JwtPayload = decodeJWT(jwt);
  const fingerprintHash =
    claims?.["https://hasura.io/jwt/claims"]?.["X-User-Fingerprint"];
  console.log("fingerprint", fingerprintHash);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, loading, error } = useUser_Refresh_TokenQuery({
    variables: {
      refreshToken,
      fingerprintHash,
    },
  });

  console.log("data refresh", data, error);

  return (
    <div>
      <h1>refresh token</h1>
    </div>
  );
};
export default RefreshToken;
