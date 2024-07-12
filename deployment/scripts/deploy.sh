#!/bin/ash

cp -rf /app/build/FFLernApp/frontend/fflernapp/dist /app/deployment
cp -rf /app/build/FFLernApp/backend/artifact/target/artifact-0.0.1-SNAPSHOT.war /app/deployment/tomcat10/webapps
/app/deployment/tomcat10/bin/shutdown.sh
/app/deployment/tomcat10/bin/startup.sh