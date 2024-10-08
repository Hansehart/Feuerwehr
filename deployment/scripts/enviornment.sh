#!/bin/ash

# Define Tomcat version as a variable
TOMCAT_VERSION="10.1.30"

# update package index
apk update

# install git and ssh (access repo)
apk add --no-cache git openssh

# install node.js and npm (frontend)
apk add --no-cache nodejs npm

# install java, maven and tomcat (backend)
apk add --no-cache openjdk17 maven

# install tomcat
wget -P /app/deployment https://dlcdn.apache.org/tomcat/tomcat-10/v$TOMCAT_VERSION/bin/apache-tomcat-$TOMCAT_VERSION.tar.gz
tar -xzf /app/deployment/apache-tomcat-$TOMCAT_VERSION.tar.gz -C /app/deployment
rm /app/deployment/apache-tomcat-$TOMCAT_VERSION.tar.gz
mv /app/deployment/apache-tomcat-$TOMCAT_VERSION /app/deployment/tomcat10
rm -r /app/deployment/tomcat10/apache-tomcat-$TOMCAT_VERSION

# access to github
cp -r /app/init/.ssh/ ~/.ssh

# execute scripts
/app/init/build.sh
/app/init/deploy.sh
node /app/init/webhook.js