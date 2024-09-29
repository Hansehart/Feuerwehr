#!/bin/ash

# clone repo
mkdir -p /app/build
cd /app/build
rm -r /app/build/*
git clone git@github.com:Hansehart/Feuerwehr.git

# build app.war
cd /app/build/Feuerwehr/backend/artifact
mvn package

# build /dist
cd /app/build/Feuerwehr/frontend/artifact
npm install
npm run build

