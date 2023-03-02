# Final Project for Advanced Web Applications by Adrián Infante Pérez

## What is it?

This is a web application that allows users to register and log in to a system where code snippets can be posted and seen by anyone. Note that non-authenticated users can see the content but cannot post, edit or comment on items.

## Features

1. NodeJS backend application.
2. React frontend application.
3. MongoDB database.

## Available npm commands

1. `npm run install`: Installs the dependencies for client and server applications.
2. `npm run preinstall`: Installs the dependencies for the server application. Because it is run automatically when using the previous command it should not be necessary.
3. `npm run dev:server`: Runs the server application in development mode.
4. `npm run dev:client`: Runs the client application in development mode.
5. `npm run build`: Creates the optimized static build files for the client application so they can be served by the server application. Run this when changes are made to the client application.
6. `npm run start`: Starts the server application in production mode. Because the client application should have been built beforehand it does not need to be run, as the files are static and do not change.

## Assumptions

1. Assumes that a .env file exists with the key "SECRET".
2. Unless explicitly stated otherwise with the "MONGO_URL" key it assumes that a MongoDB database is running on the URL "mongodb://localhost:27017/testdb".
3. Unless explicitly stated otherwise with the "PORT" key it assumes that the server is running on PORT 1234.
