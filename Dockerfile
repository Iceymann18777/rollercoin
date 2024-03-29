FROM node:16-alpine
WORKDIR /usr/src/app
COPY package*.json ./ package-lock.json ./
RUN npm i 
COPY . .
EXPOSE 3500
CMD [ "npm", "start" ]
