# NextJs Sign Hasura

## Notes

> using wagmi and siwe lib to provide a smooth signin

- https://wagmi-xyz.vercel.app/guides/sign-in-with-ethereum
- https://login.xyz/
- https://github.com/spruceid/siwe-quickstart
- https://docs.login.xyz/libraries/typescript

```sh
cd hasura
# copy .env.example to .env and create JWT token inside your .env
make jwt
# create docker network
docker network create netrunner-web3-auth
```

```sh
cd hasura
# will launch postgres and Hasura containers
docker-compose up
```

```sh
make metadata
make migrate

# OR directly with hasura CLI
hasura metadata apply --endpoint "${HASURA_STAGING_ENDPOINT}" --admin-secret "${HASURA_GRAPHQL_ADMIN_SECRET}"

hasura migrate apply --endpoint "${HASURA_STAGING_ENDPOINT}" --admin-secret "${HASURA_GRAPHQL_ADMIN_SECRET}"
```

```sh
make console
# to launch the Hasura GUI on port 9596
```