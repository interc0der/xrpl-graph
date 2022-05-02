#!/usr/bin/env sh
set -eu 

envsubst '
${NFT_PORT_ADMIN}
${NFT_PORT_PUBLIC}
${NFT_PORT_PEER}
${NFT_WS_PUBLIC}
${NFT_WS_ADMIN}
' < /opt/rippled.cfg.template > /etc/opt/ripple/rippled.cfg

# Start rippled, Passthrough other arguments
exec /opt/ripple/bin/rippled --conf /etc/opt/ripple/rippled.cfg "$@"
