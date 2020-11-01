FROM node:alpine
WORKDIR /server
COPY package*.json ./
RUN npm install -q
COPY . .

EXPOSE 5000
CMD ["npm","start"]