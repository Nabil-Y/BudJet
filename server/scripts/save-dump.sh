#!/usr/bin/env bash

source ../.env

now=$(date +"%Y-%m-%d-%H-%M-%S")
dump_filename="dump-${now}.sql"

docker exec -i budjet-dev /bin/sh -c "PGPASSWORD=${PG_PASSWORD} pg_dump ${DB_NAME} -U ${PG_USER}" > ./dumps/${dump_filename}

echo "Nouveau dump généré dans: /dumps/"
