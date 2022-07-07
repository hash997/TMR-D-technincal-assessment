FROM node:11.4.0


WORKDIR /rates-app

COPY package.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm", "run", "test"]
