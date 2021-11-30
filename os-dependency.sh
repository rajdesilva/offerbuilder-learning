#!/bin/bash

# docker
${CMD_PREFIX} apt-get install apt-transport-https ca-certificates curl gnupg-agent software-properties-common lsb-release gnupg gettext-base -y

# az cli
${CMD_PREFIX} curl -sL https://packages.microsoft.com/keys/microsoft.asc |  gpg --dearmor |  ${CMD_PREFIX} tee /etc/apt/trusted.gpg.d/microsoft.asc.gpg > /dev/null
AZ_REPO=$(lsb_release -cs)
${CMD_PREFIX} echo "deb [arch=amd64] https://packages.microsoft.com/repos/azure-cli/ $AZ_REPO main" | ${CMD_PREFIX} tee /etc/apt/sources.list.d/azure-cli.list

# install frontend deps
${CMD_PREFIX} curl -sL https://deb.nodesource.com/setup_${NODE_VER}.x | sudo -E bash -
# ${CMD_PREFIX} curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
# echo "deb https://dl.yarnpkg.com/debian/ stable main" | ${CMD_PREFIX} tee /etc/apt/sources.list.d/yarn.list

# install backend deps
${CMD_PREFIX} apt-get update
${CMD_PREFIX} apt-get install docker.io azure-cli=2.1.0-1~bionic nodejs -y
${CMD_PREFIX} npm install --global yarn@1.7.0
echo "Dependencies Versions"
node --version
npm --version
yarn --version