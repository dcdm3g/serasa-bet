FROM node:22-alpine

WORKDIR /usr/src/app
COPY . .

EXPOSE 8080
CMD [ "npm", "run", "start" ]