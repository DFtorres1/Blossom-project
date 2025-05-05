import express, { json, urlencoded } from 'express';
import cors from 'cors';
import logger from './utils/logger';
import { swaggerSpec, swaggerUi } from './utils/swagger';
import { errorHandler } from './utils/error-handler';
import { ruruHTML } from 'ruru/server';

const app = express();

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

app.use((req, res, next) => {
  const startTime = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const message = `${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`;

    if (res.statusCode >= 500) {
      logger.error(message);
    } else if (res.statusCode >= 400) {
      logger.warn(message);
    } else {
      logger.info(message);
    }
  });

  next();
});

// Enable CORS
app.use(cors(corsOptions));

// Middleware for parsing JSON and URL-encoded bodies
app.use(json());
app.use(urlencoded({ extended: true }));

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error managing
app.use(errorHandler);

// Serve the GraphiQL IDE.
app.get('/', (_req, res) => {
  res.type('html');
  res.end(ruruHTML({ endpoint: '/graphql' }));
});

export default app;
