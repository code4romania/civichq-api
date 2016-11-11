# Centrul Civic

####Initial node via nvm setup:
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash
source ~/.bashrc
nvm install node
```

####
```
npm install
npm install -g pm2

pm2 startOrRestart ecosystem-my.json5
pm2 start api/server.js

# view live logs
pm2 logs

# view running apps
pm2 list
```
