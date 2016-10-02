#!/bin/bash
cd /www/civichq-api
npm install
# npm run postinstall
# npm run build

pm2 startOrRestart ecosystem.json5