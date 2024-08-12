#!/bin/ash

cp -rf /app/build/Feuerwehr/frontend/artifact/dist /app/deployment
cp -rf /app/build/Feuerwehr/backend/artifact/target/artifact-0.0.1-SNAPSHOT.war /app/deployment/tomcat10/webapps
/app/deployment/tomcat10/bin/shutdown.sh
/app/deployment/tomcat10/bin/startup.sh

