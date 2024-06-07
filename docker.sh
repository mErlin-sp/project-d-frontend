#!/usr/bin/env bash
docker build -t project-d-frontend .
docker run -P -d \
    --name project-d-frontend \
    --env SERVICE_ADDR=127.0.0.1 \
    --env SERVICE_PORT=8000 \
    --network host \
    --restart always \
    project-d-frontend
