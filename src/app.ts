import dotenv from 'dotenv';
// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: '.env' });

import express, { NextFunction } from 'express';
import * as cors from 'cors';
import * as http from 'http';
import mongoose from 'mongoose';
import kue, { Job } from 'kue';
const queue = kue.createQueue();
import os from 'os';
import exphbs from 'express-handlebars';
import * as bodyParser from 'body-parser';
import 'reflect-metadata';
import { createConnection, Connection } from 'typeorm';
import * as Sentry from '@sentry/node';

import * as appConfig from './common/app-config';

import { check, validationResult } from 'express-validator/check';
import router from './route/api-route';
import btcRouter from './route/bitcoin-route';

Sentry.init({ dsn: 'https://29f4048d45ec4d7eb6da4c7f231195e9@sentry.io/1543859' });

const mongoURI = process.env.MONGO_URI || `mongodb://localhost:27017/detectivedb`;
/**
 * Connect to DB
 */

mongoose.connect(mongoURI, { useCreateIndex: true, useNewUrlParser: true })
  .then(() => {
    console.log(`Success to connect database: ${mongoURI}`);
  })
  .catch(err => {
    if (err) {
      console.log(`Connect to DB err: ${err}`);
    }
  });

// Connect to DB
let dbConnection: Connection;
createConnection().then(async connection => {
  dbConnection = connection;
  console.log('Connected to DB:', connection.name);
}).catch(error => console.log('TypeORM connection error: ', error));

/**
 * Create Express server.
 */
const app = express();

/**
 * Create http server from express server
 */
const server = http.createServer(app);

// view engine
const hbs = exphbs.create({
  defaultLayout: 'main',
  // Specify helpers which are only registered on this instance.
  helpers: {
    demoHelperHbs: (text: string) => {
      return 'This is text ' + text;
    }
  }
});
/**
 * View engine using
 */
app.engine('handlebars', hbs.engine as any);
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());

app.use('/kue-ui', kue.app);
/**
 * Primary app routes.
 */
app.use('/', router);
app.use('/bitcoin', btcRouter);

/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 3333);

/**
 * Start Express server.
 */
server.listen(app.get('port'), () => {
  console.log(('  App is running at http://localhost:%d in %s mode'), app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});

process.on('SIGINT', () => {
  const cleanUp = async () => {
    // Clean up other resources like DB connections
    console.log('cleanup..');
    await dbConnection.close();
    console.log('closed db connection');
  };

  console.log('Closing server...');

  server.close(async () => {
    await cleanUp();
    console.log('Server closed !!!');
    process.exit();
  });

  // Force close server after 5secs
  setTimeout((e) => {
    console.log('Forcing server close !!!', e);

    cleanUp();
    process.exit(1);
  }, 5000);
});

module.exports = app;