#!/usr/bin/env bash
docker build -t project-d-frontend .
docker run -P -d \
    --name project-d-frontend \
    --network host \
    --restart always \
    project-d-frontend
