#!/usr/bin/env sh

# Start clio, Passthrough other arguments
exec ./clio/clio_server ./cfg/config.json "$@"
