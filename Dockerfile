FROM node:17

ENV MONGODB_URL=
ENV MONGODB_NAME=
ENV MONGODB_COLLECTION_NAME=

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . ./
EXPOSE 3000
CMD ["npm", "run", "dev"]