import { useEffect } from "react";
import { useHasura_MeQuery } from "../graphql/generated/graphql";
import useStorage from "../hooks/useStorage";

const UserPage = () => {
  const { loading, error, data } = useHasura_MeQuery();
  const { setItem } = useStorage();

  // TODO write the new refreshToken for the user
  useEffect(() => {
    setItem("refreshToken", data?.user[0].refresh_token, "session");
  }, [data]);

  return (
    <>
      <h1>User</h1>
      {loading && <p>loading...</p>}
      {error && <p>error!!!</p>}
      {data && (
        <ul>
          <li>address : {data.user[0].address}</li>
          <li>chain ID: {data.user[0].chainId}</li>
          <li>refresh jwt: {data.user[0].refresh_token}</li>
        </ul>
      )}
    </>
  );
};
export default UserPage;
