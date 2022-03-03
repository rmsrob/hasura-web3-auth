import { useHasura_MeQuery } from "../graphql/generated/graphql";

const UserPage = () => {
  const { loading, error, data } = useHasura_MeQuery();
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
          <li>expiration data: {data.user[0].refresh_token_expires_at}</li>
        </ul>
      )}
    </>
  );
};
export default UserPage;
