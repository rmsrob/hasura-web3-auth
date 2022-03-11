import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  timestamptz: any;
  uuid: any;
};

export type AccessTokens = {
  __typename?: 'AccessTokens';
  jwt: Scalars['String'];
  refreshToken: Scalars['String'];
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']>;
  _gt?: InputMaybe<Scalars['Int']>;
  _gte?: InputMaybe<Scalars['Int']>;
  _in?: InputMaybe<Array<Scalars['Int']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Int']>;
  _lte?: InputMaybe<Scalars['Int']>;
  _neq?: InputMaybe<Scalars['Int']>;
  _nin?: InputMaybe<Array<Scalars['Int']>>;
};

export type JwtToken = {
  __typename?: 'JwtToken';
  jwt: Scalars['String'];
};

export type SignInInput = {
  address: Scalars['String'];
};

export type SignoutOutput = {
  __typename?: 'SignoutOutput';
  ok: Scalars['Boolean'];
};

export type SignupInput = {
  address: Scalars['String'];
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "user" */
  delete_user?: Maybe<User_Mutation_Response>;
  /** delete single row from the table: "user" */
  delete_user_by_pk?: Maybe<User>;
  /** insert data into the table: "user" */
  insert_user?: Maybe<User_Mutation_Response>;
  /** insert a single row into the table: "user" */
  insert_user_one?: Maybe<User>;
  signout?: Maybe<SignoutOutput>;
  signup: AccessTokens;
  /** update data of the table: "user" */
  update_user?: Maybe<User_Mutation_Response>;
  /** update single row of the table: "user" */
  update_user_by_pk?: Maybe<User>;
};


/** mutation root */
export type Mutation_RootDelete_UserArgs = {
  where: User_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_User_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootInsert_UserArgs = {
  objects: Array<User_Insert_Input>;
  on_conflict?: InputMaybe<User_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_OneArgs = {
  object: User_Insert_Input;
  on_conflict?: InputMaybe<User_On_Conflict>;
};


/** mutation root */
export type Mutation_RootSignupArgs = {
  params: SignupInput;
};


/** mutation root */
export type Mutation_RootUpdate_UserArgs = {
  _inc?: InputMaybe<User_Inc_Input>;
  _set?: InputMaybe<User_Set_Input>;
  where: User_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_User_By_PkArgs = {
  _inc?: InputMaybe<User_Inc_Input>;
  _set?: InputMaybe<User_Set_Input>;
  pk_columns: User_Pk_Columns_Input;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

export type Query_Root = {
  __typename?: 'query_root';
  /** refreshJwtToken */
  refreshJwtToken: JwtToken;
  /** user signIn */
  signin: AccessTokens;
  /** fetch data from the table: "user" */
  user: Array<User>;
  /** fetch aggregated fields from the table: "user" */
  user_aggregate: User_Aggregate;
  /** fetch data from the table: "user" using primary key columns */
  user_by_pk?: Maybe<User>;
};


export type Query_RootRefreshJwtTokenArgs = {
  fingerprintHash: Scalars['String'];
  refreshToken: Scalars['String'];
};


export type Query_RootSigninArgs = {
  params: SignInInput;
};


export type Query_RootUserArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Order_By>>;
  where?: InputMaybe<User_Bool_Exp>;
};


export type Query_RootUser_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Order_By>>;
  where?: InputMaybe<User_Bool_Exp>;
};


export type Query_RootUser_By_PkArgs = {
  id: Scalars['uuid'];
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "user" */
  user: Array<User>;
  /** fetch aggregated fields from the table: "user" */
  user_aggregate: User_Aggregate;
  /** fetch data from the table: "user" using primary key columns */
  user_by_pk?: Maybe<User>;
};


export type Subscription_RootUserArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Order_By>>;
  where?: InputMaybe<User_Bool_Exp>;
};


export type Subscription_RootUser_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Order_By>>;
  where?: InputMaybe<User_Bool_Exp>;
};


export type Subscription_RootUser_By_PkArgs = {
  id: Scalars['uuid'];
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']>;
  _gt?: InputMaybe<Scalars['timestamptz']>;
  _gte?: InputMaybe<Scalars['timestamptz']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamptz']>;
  _lte?: InputMaybe<Scalars['timestamptz']>;
  _neq?: InputMaybe<Scalars['timestamptz']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']>>;
};

/** columns and relationships of "user" */
export type User = {
  __typename?: 'user';
  address?: Maybe<Scalars['String']>;
  chainId?: Maybe<Scalars['Int']>;
  created_at: Scalars['timestamptz'];
  id: Scalars['uuid'];
  refresh_token?: Maybe<Scalars['String']>;
  refresh_token_expires_at?: Maybe<Scalars['timestamptz']>;
  updated_at: Scalars['timestamptz'];
};

/** aggregated selection of "user" */
export type User_Aggregate = {
  __typename?: 'user_aggregate';
  aggregate?: Maybe<User_Aggregate_Fields>;
  nodes: Array<User>;
};

/** aggregate fields of "user" */
export type User_Aggregate_Fields = {
  __typename?: 'user_aggregate_fields';
  avg?: Maybe<User_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<User_Max_Fields>;
  min?: Maybe<User_Min_Fields>;
  stddev?: Maybe<User_Stddev_Fields>;
  stddev_pop?: Maybe<User_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<User_Stddev_Samp_Fields>;
  sum?: Maybe<User_Sum_Fields>;
  var_pop?: Maybe<User_Var_Pop_Fields>;
  var_samp?: Maybe<User_Var_Samp_Fields>;
  variance?: Maybe<User_Variance_Fields>;
};


/** aggregate fields of "user" */
export type User_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<User_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type User_Avg_Fields = {
  __typename?: 'user_avg_fields';
  chainId?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "user". All fields are combined with a logical 'AND'. */
export type User_Bool_Exp = {
  _and?: InputMaybe<Array<User_Bool_Exp>>;
  _not?: InputMaybe<User_Bool_Exp>;
  _or?: InputMaybe<Array<User_Bool_Exp>>;
  address?: InputMaybe<String_Comparison_Exp>;
  chainId?: InputMaybe<Int_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  refresh_token?: InputMaybe<String_Comparison_Exp>;
  refresh_token_expires_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "user" */
export enum User_Constraint {
  /** unique or primary key constraint */
  UserAddressKey = 'user_address_key',
  /** unique or primary key constraint */
  UserPkey = 'user_pkey'
}

/** input type for incrementing numeric columns in table "user" */
export type User_Inc_Input = {
  chainId?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "user" */
export type User_Insert_Input = {
  address?: InputMaybe<Scalars['String']>;
  chainId?: InputMaybe<Scalars['Int']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  refresh_token?: InputMaybe<Scalars['String']>;
  refresh_token_expires_at?: InputMaybe<Scalars['timestamptz']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type User_Max_Fields = {
  __typename?: 'user_max_fields';
  address?: Maybe<Scalars['String']>;
  chainId?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  refresh_token?: Maybe<Scalars['String']>;
  refresh_token_expires_at?: Maybe<Scalars['timestamptz']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type User_Min_Fields = {
  __typename?: 'user_min_fields';
  address?: Maybe<Scalars['String']>;
  chainId?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  refresh_token?: Maybe<Scalars['String']>;
  refresh_token_expires_at?: Maybe<Scalars['timestamptz']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "user" */
export type User_Mutation_Response = {
  __typename?: 'user_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<User>;
};

/** on_conflict condition type for table "user" */
export type User_On_Conflict = {
  constraint: User_Constraint;
  update_columns?: Array<User_Update_Column>;
  where?: InputMaybe<User_Bool_Exp>;
};

/** Ordering options when selecting data from "user". */
export type User_Order_By = {
  address?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  refresh_token?: InputMaybe<Order_By>;
  refresh_token_expires_at?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: user */
export type User_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "user" */
export enum User_Select_Column {
  /** column name */
  Address = 'address',
  /** column name */
  ChainId = 'chainId',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  RefreshToken = 'refresh_token',
  /** column name */
  RefreshTokenExpiresAt = 'refresh_token_expires_at',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "user" */
export type User_Set_Input = {
  address?: InputMaybe<Scalars['String']>;
  chainId?: InputMaybe<Scalars['Int']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  refresh_token?: InputMaybe<Scalars['String']>;
  refresh_token_expires_at?: InputMaybe<Scalars['timestamptz']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type User_Stddev_Fields = {
  __typename?: 'user_stddev_fields';
  chainId?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type User_Stddev_Pop_Fields = {
  __typename?: 'user_stddev_pop_fields';
  chainId?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type User_Stddev_Samp_Fields = {
  __typename?: 'user_stddev_samp_fields';
  chainId?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type User_Sum_Fields = {
  __typename?: 'user_sum_fields';
  chainId?: Maybe<Scalars['Int']>;
};

/** update columns of table "user" */
export enum User_Update_Column {
  /** column name */
  Address = 'address',
  /** column name */
  ChainId = 'chainId',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  RefreshToken = 'refresh_token',
  /** column name */
  RefreshTokenExpiresAt = 'refresh_token_expires_at',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate var_pop on columns */
export type User_Var_Pop_Fields = {
  __typename?: 'user_var_pop_fields';
  chainId?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type User_Var_Samp_Fields = {
  __typename?: 'user_var_samp_fields';
  chainId?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type User_Variance_Fields = {
  __typename?: 'user_variance_fields';
  chainId?: Maybe<Scalars['Float']>;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['uuid']>;
  _gt?: InputMaybe<Scalars['uuid']>;
  _gte?: InputMaybe<Scalars['uuid']>;
  _in?: InputMaybe<Array<Scalars['uuid']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['uuid']>;
  _lte?: InputMaybe<Scalars['uuid']>;
  _neq?: InputMaybe<Scalars['uuid']>;
  _nin?: InputMaybe<Array<Scalars['uuid']>>;
};

export type User_SignupMutationVariables = Exact<{
  address: Scalars['String'];
}>;


export type User_SignupMutation = { __typename?: 'mutation_root', signup: { __typename?: 'AccessTokens', jwt: string, refreshToken: string } };

export type User_LoginQueryVariables = Exact<{
  address: Scalars['String'];
}>;


export type User_LoginQuery = { __typename?: 'query_root', signin: { __typename?: 'AccessTokens', jwt: string, refreshToken: string } };

export type User_SignoutMutationVariables = Exact<{ [key: string]: never; }>;


export type User_SignoutMutation = { __typename?: 'mutation_root', signout?: { __typename?: 'SignoutOutput', ok: boolean } | null };

export type User_Refresh_TokenQueryVariables = Exact<{
  refreshToken: Scalars['String'];
  fingerprintHash: Scalars['String'];
}>;


export type User_Refresh_TokenQuery = { __typename?: 'query_root', refreshJwtToken: { __typename?: 'JwtToken', jwt: string } };

export type User_Check_AddressQueryVariables = Exact<{
  address: Scalars['String'];
}>;


export type User_Check_AddressQuery = { __typename?: 'query_root', user: Array<{ __typename?: 'user', id: any }> };

export type User_Insert_OneMutationVariables = Exact<{
  user: User_Insert_Input;
}>;


export type User_Insert_OneMutation = { __typename?: 'mutation_root', insert_user_one?: { __typename?: 'user', id: any } | null };

export type Hasura_MeQueryVariables = Exact<{ [key: string]: never; }>;


export type Hasura_MeQuery = { __typename?: 'query_root', user: Array<{ __typename?: 'user', id: any, address?: string | null, chainId?: number | null, refresh_token?: string | null, refresh_token_expires_at?: any | null }> };


export const User_SignupDocument = gql`
    mutation USER_SIGNUP($address: String!) {
  signup(params: {address: $address}) {
    jwt
    refreshToken
  }
}
    `;
export type User_SignupMutationFn = Apollo.MutationFunction<User_SignupMutation, User_SignupMutationVariables>;

/**
 * __useUser_SignupMutation__
 *
 * To run a mutation, you first call `useUser_SignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUser_SignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userSignupMutation, { data, loading, error }] = useUser_SignupMutation({
 *   variables: {
 *      address: // value for 'address'
 *   },
 * });
 */
export function useUser_SignupMutation(baseOptions?: Apollo.MutationHookOptions<User_SignupMutation, User_SignupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<User_SignupMutation, User_SignupMutationVariables>(User_SignupDocument, options);
      }
export type User_SignupMutationHookResult = ReturnType<typeof useUser_SignupMutation>;
export type User_SignupMutationResult = Apollo.MutationResult<User_SignupMutation>;
export type User_SignupMutationOptions = Apollo.BaseMutationOptions<User_SignupMutation, User_SignupMutationVariables>;
export const User_LoginDocument = gql`
    query USER_LOGIN($address: String!) {
  signin(params: {address: $address}) {
    jwt
    refreshToken
  }
}
    `;

/**
 * __useUser_LoginQuery__
 *
 * To run a query within a React component, call `useUser_LoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useUser_LoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUser_LoginQuery({
 *   variables: {
 *      address: // value for 'address'
 *   },
 * });
 */
export function useUser_LoginQuery(baseOptions: Apollo.QueryHookOptions<User_LoginQuery, User_LoginQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<User_LoginQuery, User_LoginQueryVariables>(User_LoginDocument, options);
      }
export function useUser_LoginLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<User_LoginQuery, User_LoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<User_LoginQuery, User_LoginQueryVariables>(User_LoginDocument, options);
        }
export type User_LoginQueryHookResult = ReturnType<typeof useUser_LoginQuery>;
export type User_LoginLazyQueryHookResult = ReturnType<typeof useUser_LoginLazyQuery>;
export type User_LoginQueryResult = Apollo.QueryResult<User_LoginQuery, User_LoginQueryVariables>;
export const User_SignoutDocument = gql`
    mutation USER_SIGNOUT {
  signout {
    ok
  }
}
    `;
export type User_SignoutMutationFn = Apollo.MutationFunction<User_SignoutMutation, User_SignoutMutationVariables>;

/**
 * __useUser_SignoutMutation__
 *
 * To run a mutation, you first call `useUser_SignoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUser_SignoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userSignoutMutation, { data, loading, error }] = useUser_SignoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useUser_SignoutMutation(baseOptions?: Apollo.MutationHookOptions<User_SignoutMutation, User_SignoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<User_SignoutMutation, User_SignoutMutationVariables>(User_SignoutDocument, options);
      }
export type User_SignoutMutationHookResult = ReturnType<typeof useUser_SignoutMutation>;
export type User_SignoutMutationResult = Apollo.MutationResult<User_SignoutMutation>;
export type User_SignoutMutationOptions = Apollo.BaseMutationOptions<User_SignoutMutation, User_SignoutMutationVariables>;
export const User_Refresh_TokenDocument = gql`
    query USER_REFRESH_TOKEN($refreshToken: String!, $fingerprintHash: String!) {
  refreshJwtToken(refreshToken: $refreshToken, fingerprintHash: $fingerprintHash) {
    jwt
  }
}
    `;

/**
 * __useUser_Refresh_TokenQuery__
 *
 * To run a query within a React component, call `useUser_Refresh_TokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useUser_Refresh_TokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUser_Refresh_TokenQuery({
 *   variables: {
 *      refreshToken: // value for 'refreshToken'
 *      fingerprintHash: // value for 'fingerprintHash'
 *   },
 * });
 */
export function useUser_Refresh_TokenQuery(baseOptions: Apollo.QueryHookOptions<User_Refresh_TokenQuery, User_Refresh_TokenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<User_Refresh_TokenQuery, User_Refresh_TokenQueryVariables>(User_Refresh_TokenDocument, options);
      }
export function useUser_Refresh_TokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<User_Refresh_TokenQuery, User_Refresh_TokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<User_Refresh_TokenQuery, User_Refresh_TokenQueryVariables>(User_Refresh_TokenDocument, options);
        }
export type User_Refresh_TokenQueryHookResult = ReturnType<typeof useUser_Refresh_TokenQuery>;
export type User_Refresh_TokenLazyQueryHookResult = ReturnType<typeof useUser_Refresh_TokenLazyQuery>;
export type User_Refresh_TokenQueryResult = Apollo.QueryResult<User_Refresh_TokenQuery, User_Refresh_TokenQueryVariables>;
export const User_Check_AddressDocument = gql`
    query USER_CHECK_ADDRESS($address: String!) {
  user(where: {address: {_eq: $address}}) {
    id
  }
}
    `;

/**
 * __useUser_Check_AddressQuery__
 *
 * To run a query within a React component, call `useUser_Check_AddressQuery` and pass it any options that fit your needs.
 * When your component renders, `useUser_Check_AddressQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUser_Check_AddressQuery({
 *   variables: {
 *      address: // value for 'address'
 *   },
 * });
 */
export function useUser_Check_AddressQuery(baseOptions: Apollo.QueryHookOptions<User_Check_AddressQuery, User_Check_AddressQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<User_Check_AddressQuery, User_Check_AddressQueryVariables>(User_Check_AddressDocument, options);
      }
export function useUser_Check_AddressLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<User_Check_AddressQuery, User_Check_AddressQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<User_Check_AddressQuery, User_Check_AddressQueryVariables>(User_Check_AddressDocument, options);
        }
export type User_Check_AddressQueryHookResult = ReturnType<typeof useUser_Check_AddressQuery>;
export type User_Check_AddressLazyQueryHookResult = ReturnType<typeof useUser_Check_AddressLazyQuery>;
export type User_Check_AddressQueryResult = Apollo.QueryResult<User_Check_AddressQuery, User_Check_AddressQueryVariables>;
export const User_Insert_OneDocument = gql`
    mutation USER_INSERT_ONE($user: user_insert_input!) {
  insert_user_one(object: $user) {
    id
  }
}
    `;
export type User_Insert_OneMutationFn = Apollo.MutationFunction<User_Insert_OneMutation, User_Insert_OneMutationVariables>;

/**
 * __useUser_Insert_OneMutation__
 *
 * To run a mutation, you first call `useUser_Insert_OneMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUser_Insert_OneMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userInsertOneMutation, { data, loading, error }] = useUser_Insert_OneMutation({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useUser_Insert_OneMutation(baseOptions?: Apollo.MutationHookOptions<User_Insert_OneMutation, User_Insert_OneMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<User_Insert_OneMutation, User_Insert_OneMutationVariables>(User_Insert_OneDocument, options);
      }
export type User_Insert_OneMutationHookResult = ReturnType<typeof useUser_Insert_OneMutation>;
export type User_Insert_OneMutationResult = Apollo.MutationResult<User_Insert_OneMutation>;
export type User_Insert_OneMutationOptions = Apollo.BaseMutationOptions<User_Insert_OneMutation, User_Insert_OneMutationVariables>;
export const Hasura_MeDocument = gql`
    query HASURA_ME {
  user {
    id
    address
    chainId
    refresh_token
    refresh_token_expires_at
  }
}
    `;

/**
 * __useHasura_MeQuery__
 *
 * To run a query within a React component, call `useHasura_MeQuery` and pass it any options that fit your needs.
 * When your component renders, `useHasura_MeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHasura_MeQuery({
 *   variables: {
 *   },
 * });
 */
export function useHasura_MeQuery(baseOptions?: Apollo.QueryHookOptions<Hasura_MeQuery, Hasura_MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Hasura_MeQuery, Hasura_MeQueryVariables>(Hasura_MeDocument, options);
      }
export function useHasura_MeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Hasura_MeQuery, Hasura_MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Hasura_MeQuery, Hasura_MeQueryVariables>(Hasura_MeDocument, options);
        }
export type Hasura_MeQueryHookResult = ReturnType<typeof useHasura_MeQuery>;
export type Hasura_MeLazyQueryHookResult = ReturnType<typeof useHasura_MeLazyQuery>;
export type Hasura_MeQueryResult = Apollo.QueryResult<Hasura_MeQuery, Hasura_MeQueryVariables>;