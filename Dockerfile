#Stage1

FROM node:lts-buster as build-step

RUN mkdir /app

WORKDIR /app

COPY package.json /app
RUN npm install

COPY . /app

RUN npm run build

#Stage2

FROM nginx:latest

COPY --from=build-step /app/build /usr/share/nginx/html