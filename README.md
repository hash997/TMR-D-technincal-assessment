# TMR&D Technical Assessment 

# Getting started

To get the Node server running locally:

- Clone this repo

- `npm install` to install all required dependencies

- Install mysql workbench and cli using ([here](https://dev.mysql.com/downloads/))
  
- `npm run dev` to start the local server 

or alternatively, run node server on docker container:
* Clone this repo
  
* `docker-compose up dev` to install all required dependencies
  
* In a different terminal, run `docker exec -it rates_app_dev bash -l` to run a new command on the container
  
* `npx sequelize-cli db:create` to create database in mysql container
  
*  `npx sequelize-cli db:migrate` to migrate tables
  
* `npx sequelize-cli db:seed:all` to populate users table for auth purpose
  
  # Code Overview

## Dependencies

- [Expressjs](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
  
- [Axios](https://github.com/axios/axios) -  For making HTTP calls

- [Passportjs](https://www.passportjs.org/) - Middleware for validating JWTs for authentication

- [Passportwebtoken](http://www.passportjs.org/packages/passport-jwt/) - For generating JWTs used by authentication
  
- [Sequelize](https://sequelize.org/) - For modeling and mapping Mysql data to javascript
  
-  [Morgan](https://github.com/expressjs/morgan) - For logging middleware's HTTP request
  
- [Swagger-jsdoc & swagger-ui-express](https://swagger.io/) - For documentation
  
- [Puppeteer](https://pptr.dev/) - Node js library for scrapping web browsers

## Application Structure

- `app.js` - The entry point to our application. This file defines our express server and connects it to mysql using Sequelize. It also requires the routes and models we'll be using in the application.

- `config/` - This folder contains configuration for Sequelize as well as a central location for configuration/environment variables.

- `routes/` - This folder contains the route definitions for our API.

- `models/` - This folder contains the schema definitions for Sequelize models.

## Important notes
1. Testing can work locally only by running `npm run test`, because there is an issue connecting server image to db images. 
2. To test api calls, db must be migrated, and populated.
3. To call api, bearer token must be provided, bearer token can be found by /login and providing name and password in body. 
