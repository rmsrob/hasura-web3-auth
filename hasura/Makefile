# export HASURA_GRAPHQL_ADMIN_SECRET=`perl -lne 'print "$1" if /^HASURA_GRAPHQL_ADMIN_SECRET=(.*$)/' "${PWD}"/hasura/.env | head -n 1`
ifneq (,$(wildcard ./.env))
    include .env
    export
endif

export REPO="${PWD}"

cmd-exists-%:
	@hash $(*) > /dev/null 2>&1 || \
		(echo "ERROR: '$(*)' must be installed and available on your PATH."; exit 1)

jwt: cmd-exists-openssl
	docker network create ${HASURA_NETWORK_NAME}
	cp -i ${REPO}/.env.example ${REPO}/.env
	openssl rand -hex 32 >> ${REPO}/.env 2>&1 &

console: cmd-exists-hasura
	npx hasura console --admin-secret ${HASURA_GRAPHQL_ADMIN_SECRET}

migrate: cmd-exists-hasura
	npx hasura migrate apply --endpoint ${HASURA_STAGING_ENDPOINT} --admin-secret ${HASURA_GRAPHQL_ADMIN_SECRET}

metadata: cmd-exists-hasura
	npx hasura metadata apply --endpoint ${HASURA_STAGING_ENDPOINT} --admin-secret ${HASURA_GRAPHQL_ADMIN_SECRET}

delete: cmd-exists-docker
	docker-compose down
	docker volume rm ${HASURA_VOLUME_NAME}