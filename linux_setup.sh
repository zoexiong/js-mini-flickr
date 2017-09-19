#!/usr/bin/env bash

sudo yum update
sudo yum install git
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install 8.x.x
node -e "console.log('Running Node.js ' + process.version)"

npm --save install bower -g
npm install --save nodemon -g
npm install
bower install
nodemon server.js