#!/usr/bin/env bash

source ../.env

echo 'Deleting database schema'
  docker exec -i budjet-dev /bin/sh -c "PGPASSWORD=${PG_PASSWORD} psql -d ${DB_NAME} -U ${PG_USER} --command 'drop schema if exists ${DB_SCHEMA} cascade'"
echo 'Database schema deleted'
