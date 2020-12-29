#!/bin/sh

docker-compose \
  -p services \
  -f services/email/docker-compose.yml \
  -f services/user/docker-compose.yml \
  -f services/authentication/docker-compose.yml \
  -f services/api-gateway/docker-compose.yml \
  up --build
