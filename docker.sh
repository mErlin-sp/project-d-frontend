#!/usr/bin/env bash
docker build -t project-d-frontend .
docker run -p 80:80 \
    --name project-d-frontend \
    --network project-d-net \
    --restart always \
    project-d-frontend
