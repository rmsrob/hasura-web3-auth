import { TokenRefreshLink } from "apollo-link-token-refresh";
import decodeJWT, { JwtPayload } from "jwt-decode";
import useStorage from "../hooks/useStorage";
import { userRefreshToken } from "../libs/admin_fetchUser";

export function makeTokenRefreshLink() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { getItem, setItem, removeItem } = useStorage();

  return new TokenRefreshLink({
    // Indicates the current state of access token expiration
    // If token not yet expired or user doesn't have a token (guest) true should be returned
    isTokenValidOrUndefined: () => {
      const token = getItem("jwt", "session");
      // console.log("check token", token);

      // If there is no token, the user is not logged in
      // We return true here, because there is no need to refresh the token
      if (!token) return true;

      // Otherwise, we check if the token is expired
      const claims: JwtPayload = decodeJWT(token);
      const expirationTimeInSeconds =
        claims.exp && ((claims.exp * 1000) as number);
      const now = new Date();
      const isValid =
        expirationTimeInSeconds !== undefined &&
        expirationTimeInSeconds >= now.getTime();
      // Return true if the token is still valid, otherwise false and trigger a token refresh
      return isValid;
    },
    fetchAccessToken: async () => {
      // TODO get jwt from session storage
      // const jwt = decodeJWT(getItem("jwt", "session")) as string;
      // TODO get fingerprintHash from jwt
      // console.log("decoded jwt:", jwt);
      // const fingerprintHash = jwt?.["https://hasura.io/jwt/claims" as any]?.[
      //   "X-User-Fingerprint" as any
      // ] as string;
      // ! can't perform well the checking of the fingerprint
      const fingerprintHash = "lol";

      const refreshToken = getItem("refreshToken", "session");
      // console.log("old refresh token: ", refreshToken);
      // TODO use admin Query to do api/hasura-refresh to refresh the jwt and update user refreshToken on db
      const requestJwt = await userRefreshToken(refreshToken, fingerprintHash);
      const newJwt = requestJwt.jwt;
      // console.log("set user new jwt", newJwt);
      setItem("jwt", newJwt, "session");
      // TODO do useEffect setItem("refreshToken") right now on pages/user
      // TODO do useEffect to setItem("refreshToken") asap (now on /Login/SignedWallet)
      return newJwt;
    },
    handleFetch: (accessToken) => {
      console.log("Access Token", accessToken);
      const claims = decodeJWT(accessToken);
      console.log("handleFetch", { accessToken, claims });
    },
    handleResponse:
      (operation, accessTokenField) =>
      (response: { refreshToken: { jwt: any } }) => {
        // here you can parse response, handle errors, prepare returned token to
        // further operations
        // returned object should be like this:
        // {
        //    access_token: 'token string here'
        // }
        // console.log("handleResponse", {
        //   operation,
        //   accessTokenField,
        //   response,
        // });
        return { access_token: response.refreshToken.jwt };
      },
    handleError: (err) => {
      // console.warn("Your refresh token is invalid.", err);
      console.warn("will attempt to refresh user's jwt");
      // ! If removed can't refresh or find user by refreshToken! Remove invalid tokens
      // removeItem("jwt", "session");
      // removeItem("refreshToken", "session");
    },
  });
}
