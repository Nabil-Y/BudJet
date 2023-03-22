#!/usr/bin/env bash

source ../.env

extension=$(echo "$1" | rev | cut -c-5 | rev)
if [[ $extension != ".sql" ]]; then
  if [ -z "$1" ]
  then
    echo "Please provide a sql dump file"
    exit 2
  fi
fi

echo 'Restoring dump...'
  docker exec -i budjet-dev /bin/sh -c "PGPASSWORD=${PG_PASSWORD} psql -d ${DB_NAME} -U ${PG_USER} --command 'drop schema if exists ${DB_SCHEMA} cascade'"
  docker exec -i budjet-dev /bin/sh -c "PGPASSWORD=${PG_PASSWORD} psql -d ${DB_NAME} -U ${PG_USER}" < $1
echo 'Dump restored'
