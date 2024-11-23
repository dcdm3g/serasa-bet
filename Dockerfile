FROM node:22-alpine

WORKDIR /usr/src/app
COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]