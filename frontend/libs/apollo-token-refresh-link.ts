import { TokenRefreshLink } from "apollo-link-token-refresh";
import decodeJWT, { JwtPayload } from "jwt-decode";
import useStorage from "../hooks/useStorage";

export function makeTokenRefreshLink() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { getItem, setItem, removeItem } = useStorage();

  return new TokenRefreshLink({
    // Indicates the current state of access token expiration
    // If token not yet expired or user doesn't have a token (guest) true should be returned
    isTokenValidOrUndefined: () => {
      console.log("isTokenValidOrUndefined");
      const token = getItem("jwt", "session");
      console.log(token);

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
    // trigger a token refresh
    fetchAccessToken: async () => {
      const jwt = decodeJWT(getItem("jwt", "session")) as string;
      console.log("fetchAccessToken jwt:", jwt);

      const refreshToken = getItem("refreshToken", "session");
      const fingerprintHash = jwt?.["https://hasura.io/jwt/claims" as any]?.[
        "X-User-Fingerprint" as any
      ] as string;

      // ! query with the user hasura role
      const request = await fetch(
        process.env["NEXT_PUBLIC_GRAPHQL_ENDPOINT"] as string,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
                  query RefreshJwtToken($refreshToken: String!, $fingerprintHash: String!) {
                    refreshJwtToken(refreshToken: $refreshToken, fingerprintHash: $fingerprintHash) {
                      jwt
                    }
                  }
                `,
            variables: {
              refreshToken,
              fingerprintHash,
            },
          }),
        }
      );

      const result = await request.json();
      return result;
    },
    handleFetch: (accessToken) => {
      const claims = decodeJWT(accessToken);
      console.log("handleFetch", { accessToken, claims });
      setItem("jwt", accessToken, "session");
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
        console.log("handleResponse", {
          operation,
          accessTokenField,
          response,
        });
        return { access_token: response.refreshToken.jwt };
      },
    handleError: (err) => {
      console.warn("Your refresh token is invalid. Try to reauthenticate.");
      console.error(err);
      // Remove invalid tokens
      removeItem("jwt", "session");
      removeItem("refreshToken", "session");
    },
  });
}
