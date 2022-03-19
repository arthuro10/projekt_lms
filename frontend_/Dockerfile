FROM node:14.16-alpine
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . ./
RUN npm run build:dev

CMD ["npm", "run", "dev"]


