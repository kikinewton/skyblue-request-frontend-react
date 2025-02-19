FROM node:16.3.0-alpine AS build-stage

#set the working directory
WORKDIR /app

#copy the package and package lock files
#from local to container work directory /app
COPY package*.json /app/

COPY default.conf /app/


#Run command npm install to install packages
RUN npm install

#copy all the folder contents from local to container
COPY . .

#create a react production build
RUN npm run build

#get the latest alpine image from nginx registry
FROM nginx:alpine

#we copy the output from first stage that is our react build
#into nginx html directory where it will serve our index file

COPY --from=build-stage /app/build/ /usr/share/nginx/html
COPY --from=build-stage /app/default.conf /etc/nginx/conf.d/
