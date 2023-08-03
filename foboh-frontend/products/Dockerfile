FROM node:18 as build
WORKDIR /app
COPY package*.json ./
RUN npm install 
COPY . .
RUN npm run build --if-present

 

FROM ubuntu:20.04
RUN apt update
RUN apt install nginx -y
COPY nginx.conf /etc/nginx/sites-available/default
COPY --from=build /app/dist /var/www/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]