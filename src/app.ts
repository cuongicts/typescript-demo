import dotenv from 'dotenv';
// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: '.env' });

import express, { NextFunction } from 'express';
import path from 'path';
import exphbs from 'express-handlebars';
import * as bodyParser from 'body-parser';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as appConfig from './common/app-config';

import { check, validationResult } from 'express-validator/check';
import router from './route/api-route';
import chatAppRouter from './route/chat-app-route';

/**
 * Create Express server.
 */
const app = express();

/**
 * View engine using
 */
// app.engine('handlebars', hbs.engine);
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

console.log(path.join(__dirname, '../src/public'));
app.use(express.static(path.join(__dirname, '../src/public')));

/**
 * Primary app routes.
 */
app.use('/', router);
app.use('/chat', chatAppRouter);

/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 3333);

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log(('  App is running at http://localhost:%d in %s mode'), app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});

/**
 * Create connection to DB using configuration provided in
 * appconfig file
 */
createConnection().then(async connection => {
  console.log('Connected to DB: ' + connection.name);

}).catch(error => console.log('TypeORM connection error: ', error));

module.exports = app;