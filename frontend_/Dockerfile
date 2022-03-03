FROM node:14.16-alpine
WORKDIR /frontend_
ENV PATH="./node_modules/.bin:$PATH"
COPY . . 
RUN npm run build:dev
CMD ["npm","run","dev"]
EXPOSE 8080