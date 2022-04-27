FROM node:alpine as builder
WORKDIR /app
COPY ./package.json /app/
COPY ./package-lock.json /app/
COPY ./ /app
RUN npm i

FROM node:13.10.1-alpine as build-stage
COPY --from=builder /app/node_modules/ /app/node_modules/
WORKDIR /app
COPY . .
RUN npm i

FROM node:13.10.1-alpine
COPY --from=build-stage /app/build /app/build/
RUN npm i
CMD ["npm", "run", "start"]