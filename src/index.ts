import 'dotenv/config';

import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import configs from './configs';
import router from './routes';
import { errorHandler } from './middlewares/errorHandler';

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
