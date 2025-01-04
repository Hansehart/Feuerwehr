# Base image for Java and Maven
FROM maven:3.9.9-eclipse-temurin-17-alpine AS build

# Copy project files
WORKDIR /app/build
COPY ./artifact .

# Build the backend WAR file
RUN mvn clean package -DskipTests

# Use Tomcat as the runtime
FROM tomcat:10.1.34-jdk17

# Copy the built WAR file into Tomcat's webapps directory
COPY --from=build /app/build/target/artifact-0.0.1-SNAPSHOT.war /usr/local/tomcat/webapps/

# Expose Tomcat's default port
EXPOSE 8080

# Start Tomcat
CMD ["catalina.sh", "run"]
