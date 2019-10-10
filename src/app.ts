import dotenv from 'dotenv';
// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: '.env' });

import express, { NextFunction } from 'express';
import * as cors from 'cors';
import kue, { Job } from 'kue';
const queue = kue.createQueue();
import cluster from 'cluster';
import os from 'os';
const clusterWorkerSize = os.cpus().length;
import exphbs from 'express-handlebars';
import * as bodyParser from 'body-parser';
import 'reflect-metadata';
import { createConnection, getRepository } from 'typeorm';
import * as Sentry from '@sentry/node';

import * as appConfig from './common/app-config';

import { check, validationResult } from 'express-validator/check';
import router from './route/api-route';

Sentry.init({ dsn: 'https://29f4048d45ec4d7eb6da4c7f231195e9@sentry.io/1543859' });

// Connect to DB
createConnection().then(async connection => {
  if (cluster.isMaster) {
    console.log('is master');
    /**
     * Start Express server.
     */
    app.listen(app.get('port'), () => {
      console.log(('  App is running at http://localhost:%d in %s mode'), app.get('port'), app.get('env'));
      console.log('  Press CTRL-C to stop\n');
    });
    for (let i = 0; i < clusterWorkerSize; i++) {
      cluster.fork();
    }
  } else {
    // console.log(`Worker ${process.pid} started`);
  }
  console.log('Connected to DB:', connection.name);
}).catch(error => console.log('TypeORM connection error: ', error));

/**
 * Create Express server.
 */
const app = express();

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

/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 3333);

/**
 * Start Express server.
 */
// app.listen(app.get('port'), () => {
//   console.log(('  App is running at http://localhost:%d in %s mode'), app.get('port'), app.get('env'));
//   console.log('  Press CTRL-C to stop\n');
// });




module.exports = app;