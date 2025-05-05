import dotenv from 'dotenv';
import app from './app';
import graphqlHandler from './gql';
import DB from './database';
import logger from './utils/logger';

dotenv.config();

const PORT = process.env.PORT || 4000;

app.all('/graphql', graphqlHandler);

DB.sequelize
  .authenticate()
  .then(() => {
    logger.info('Database connected successfully!');
    app.listen(PORT, () => {
      logger.info(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(error => {
    logger.error('Unable to connect to the database:', error);
  });
