import axios, { HeadersDefaults } from "axios";

interface CommonHeaderProperties extends HeadersDefaults {
  "Content-Type": string;
  "X-Hasura-Admin-Secret": string;
}

// Admin fetcher on Hasura graphql endpoint with Axios
export async function axiosHasura(
  operationName: string,
  query: any,
  variables: any
) {
  const URL =
    process.env.NODE_ENV !== "production"
      ? "http://localhost:8080/v1/graphql"
      : (process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT as string);

  const headers = {
    "Content-Type": "application/json",
    "X-Hasura-Admin-Secret": process.env["NEXT_PUBLIC_GRAPHQL_ADMIN_SECRET"],
  } as CommonHeaderProperties;

  const graphqlQuery = {
    operationName,
    query,
    variables,
  };

  const response = await axios({
    url: URL,
    method: "post",
    headers: headers,
    data: graphqlQuery,
  } as unknown as any);
  return response;
}

export const findUser = async (address: string) => {
  const q = `query UserByAddress($address: String!){
      user(where: {address: {_eq: $address}}) {
        id
        address
        chainId
        refresh_token
        refresh_token_expires_at
      }
    }`;
  const v = { address };

  const request = await axiosHasura("UserByAddress", q, v);
  // console.log("UserByAddress", request);
  if (request.data.errors) {
    return console.log("error", request.data.errors[0].message);
  } else {
    const user = await request.data.data.user[0];
    return user;
  }
};

export const findUserf = async (refreshToken: string) => {
  const q = `query UserByFingerprint($refreshToken: String!){
      user(where: {refresh_token: {_eq: $refreshToken}}) {
        id
        address
        chainId
        refresh_token
        refresh_token_expires_at
      }
    }`;
  const v = { refreshToken };

  const request = await axiosHasura("UserByFingerprint", q, v);
  // console.log("UserByFingerprint var", v);
  if (request.data.errors) {
    return console.log("error", request.data.errors[0].message);
  } else {
    const user = await request.data.data.user[0];
    // console.log("user", user);
    return user;
  }
};

// We must get the user address and build for him the tokens then send the update to Hasura
export const insertUser = async (
  address: string,
  refresh_token: string,
  refresh_token_expires_at: string
) => {
  const q = `mutation InsertUser($address: String!, $refresh_token: String!, $refresh_token_expires_at: timestamptz!) {
    insert_user_one(object: {address: $address, refresh_token: $refresh_token, refresh_token_expires_at: $refresh_token_expires_at}) {
      id
      address
    }
  }`;
  const v = { address, refresh_token, refresh_token_expires_at };

  const request = await axiosHasura("InsertUser", q, v);
  // console.log("InsertUser", request);
  if (request.data.errors) {
    return console.log("error", request.data.errors[0].message);
  } else {
    const user = await request.data.data.insert_user_one;
    return user;
  }
};

// we need to capture the Hasura ID of the user then re build the tokens and update his data
export const updateUserRefreshToken = async (
  id: string,
  refresh_token: string,
  refresh_token_expires_at: string
) => {
  const q = `mutation UpdateUserRefreshToken($id: uuid!, $refresh_token: String!, $refresh_token_expires_at: timestamptz!) {
    update_user_by_pk(pk_columns: {id: $id}, _set: {refresh_token: $refresh_token, refresh_token_expires_at: $refresh_token_expires_at}) {
      id
      address
      refresh_token
    }
  }`;
  const v = { id, refresh_token, refresh_token_expires_at };

  const request = await axiosHasura("UpdateUserRefreshToken", q, v);
  // console.log("updateUserRefreshToken", request);
  if (request.data.errors) {
    return console.log("error", request.data.errors[0].message);
  } else {
    const user = request.data.data.update_user_by_pk;
    return user;
  }
};

export const userRefreshToken = async (
  refreshToken: string,
  fingerprintHash: string
) => {
  const q = `query RefreshJwtToken($refreshToken: String!, $fingerprintHash: String!) {
    refreshJwtToken(refreshToken: $refreshToken, fingerprintHash: $fingerprintHash) {
      jwt
    }
  }`;
  const v = { refreshToken, fingerprintHash };

  const request = await axiosHasura("RefreshJwtToken", q, v);
  // console.log("RefreshJwtToken", request);
  if (request.data.errors) {
    return console.log("error", request.data.errors[0].message);
  } else {
    const jwt = request.data.data.refreshJwtToken;
    return jwt;
  }
};
