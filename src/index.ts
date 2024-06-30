import 'dotenv/config';

import { readFileSync } from 'fs';

import express, { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import passport from 'passport';
import cors from 'cors';
import { ExtractJwt, Strategy } from 'passport-jwt';
import schedule from 'node-schedule';
import swaggerJsdoc from 'swagger-jsdoc';
import configs from './configs';
import router from './routes';
import { errorHandler } from './middlewares/errorHandler';

const packageJson = require('../package.json');

(async () => {
  const app: Express = express();
  const jsonParser = bodyParser.json();
  const port = configs.PORT;
  const origin = configs.ORIGIN.split(',');

  app.use(
    cors({
      origin: origin.includes('*') ? '*' : origin,
    }),
  );

  app.use(jsonParser);
  app.use(router);
  app.use(errorHandler);

  app.listen(port, () => {
    console.info(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
})();
