#!/bin/sh

docker-compose \
  -p services \
  -f services/email/docker-compose.yml \
  -f services/user/docker-compose.yml \
  -f services/authentication/docker-compose.yml \
  up --build
  # -f services/api-gateway/docker-compose.yml \
