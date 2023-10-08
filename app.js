import { ApolloServer } from 'apollo-server';
// import dotenv to use .env file
import dotenv from 'dotenv';
// import express module
import express from 'express';
import expressLayout from 'express-ejs-layouts';
// graphql
import gql from 'graphql-tag';
import path from 'path';
import resolvers from './graphql/resolvers/index.js';
import typeDefs from './graphql/typeDefs.js';
import countdown from './helpers/openingTimeHelper.js'; // getting the opening time
import Post from './models/Post.js';
import connectDB from './server/config/db.js'; // to connect to db
// import constants from './config/constants.js';
// import { logger } from './middleware/logEvents.js';
// routes
import adminRouter from './server/routes/admin.js';
import textRouter from './server/routes/text.js';

dotenv.config();

// create server on port 4000




const server = new ApolloServer({ typeDefs, resolvers, context : ({ req }) => ({ req }) });

// connect to db
connectDB();


server.listen({ port: process.env.PORT || 4000 }).then(res => { console.log(`Server running at ${res.url}`); });



// const app = express(); // to initialize server
// const PORT = 6000 || process.env.PORT; // second for live use





// IF OPENING TIME SERVE MAP
if (countdown.openNow) {
  // if opening time serve map
  app.use('/', textRouter);
} else {
  // if closing time serve archive with countdown
  app.use('/', archiveRouter);
}

app.use('/', generalRouter);
app.use('/', adminRouter);

// MIDDLWARES
// to be able to pass data in form
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// setting public folder
app.use(express.static('public'));
// templating engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// handling route for homepage
app.use('/', mainRouter);

// separate for admin
app.use('/', adminRouter);

// last thing I need to listen at the port
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  ``;
});
``