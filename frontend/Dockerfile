# Build Stage: Build React App
FROM node:alpine3.20 AS build

# Set working directory
WORKDIR /app

# Install dependencies
COPY ./artifact .
RUN npm install --frozen-lockfile

# Build the app
RUN npm run build

# Serve Stage: Apache Server
FROM httpd:2.4-alpine

# Copy built React app to Apache's public directory
COPY --from=build /app/dist /usr/local/apache2/htdocs/

# Configuration for SPA
COPY .htaccess /usr/local/apache2/htdocs/.htaccess

# Enable .htaccess by modifying Apache configuration
RUN sed -i 's/AllowOverride None/AllowOverride All/g' /usr/local/apache2/conf/httpd.conf \
    && sed -i 's/#LoadModule rewrite_module/LoadModule rewrite_module/g' /usr/local/apache2/conf/httpd.conf

# Expose port
EXPOSE 80

# Start Apache
CMD ["httpd", "-D", "FOREGROUND"]
