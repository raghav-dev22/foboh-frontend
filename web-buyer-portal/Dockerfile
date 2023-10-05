# FROM node:18 as build
# WORKDIR /app
# COPY package*.json ./
# RUN npm install 
# COPY . .
# RUN npm run build --if-present
# RUN cp -r ./public/assets dist/ && cp -r ./public/image dist/


# FROM ubuntu:20.04
# RUN apt update
# RUN apt install nginx -y
# COPY nginx.conf /etc/nginx/sites-available/default
# COPY --from=build /app/dist /var/www/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

# Use a smaller base image with Node.js installed (Alpine-based) 
FROM node:18.17-alpine as build

# Set the working directory inside the container
WORKDIR /app

# Copy only the package.json and package-lock.json files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the necessary files for the build
COPY . .

# Build the React application
RUN npm run build --if-present
#RUN cp -r ./public/assets dist/ && cp -r ./public/image dist/

# Remove development dependencies and other unnecessary files
RUN npm prune --production && \
    rm -rf node_modules && \
    rm -rf public

# Use a lightweight base image for the final image
FROM nginx:alpine

# Copy the optimized build artifacts from the previous stage
COPY --from=build /app/build /var/www/html

# Copy the nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port for the nginx server
EXPOSE 3000

# Start nginx and keep the container running
CMD ["nginx", "-g", "daemon off;"]
