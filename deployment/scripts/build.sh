#!/bin/ash

# clone repo
mkdir -p /app/build
cd /app/build
rm -r /app/build/*
git clone git@github:LittleBitDevelopment/FFLernApp.git

# build app.war
cd /app/build/FFLernApp/backend/artifact
mvn package

# build /dist
cd /app/build/FFLernApp/frontend/fflernapp
npm install
npm run build