#!/bin/bash
cd /www/civichq-api
npm install
# npm run postinstall
# npm run build

pkill -9 PM2 && pkill -9 node # sorry pm2, you have to really restart
pm2 startOrRestart /etc/civichq_api/ecosystem.json

