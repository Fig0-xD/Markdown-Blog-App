# Markdown Blog App

## Description

A simple blog application made using ReactJS which supports markdown language

## Installation

1. Clone the Repository
2. Open two terminals
3. Run `cd server/` on first terminal
4. Run `npm run dev` on first terminal
5. Similarly run `cd client/` on the second terminal
6. Finally run `npm start` on the second terminal
7. Open browser on `http://localhost:3000`

## Libraries used

### Client

-   Axios - Used to communicate with the server
-   React-Bootstrap - Used to style the components
-   React-Router-Dom - Used to create individual routes

### Server

-   cors - Used for Cross Origin Data Transfer
-   dompurify - Used to sanitize the markdown data
-   dotenv - Used to access environment variables
-   express - Used to make the Express App
-   jsdom - Helper component for **dompurify** module
-   marked - Used to convert markdown language to html object
-   method-override - Used to utilize **delete** and **patch** methods in server
-   mongoose - Used to store data at mongodb clusters
-   nodemon - Used to auto restart server on detection of changes in code (devDependency)

## Interior Process

MongoDB is used to store the contents of each individual article. The client fetches as well as posts data to the Express server using **Axios** which is then processed and accessed from MongoDB servers and finally served to the client.
