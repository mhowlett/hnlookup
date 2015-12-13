#!/bin/bash

docker run -d \
  --name hnlookup \
  -p 8601:8601 \
  -v /data:/data \
  -v /git/hnlink:/usr/src/app \
  -w /usr/src/app \
  node:4 \
  ./prepare.sh
