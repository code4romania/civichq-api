#!/bin/bash

if ! [ -x "$(command -v nvm)" ]; then
  echo 'nvm is not installed.' >&2
  curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash
fi

. $HOME/.nvm/nvm.sh

nvm install node

npm install
npm install -g pm2

pm2 startOrRestart ecosystem-my.json5
pm2 start api/server.js

