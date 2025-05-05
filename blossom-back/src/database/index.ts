import { Sequelize, Dialect } from 'sequelize';
import {
  DB_DIALECT,
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
} from '../config';
import Character from './models/characters/character.model';

const sequelize = new Sequelize(
  DB_NAME || 'blossom',
  DB_USERNAME || 'postgres',
  DB_PASSWORD || '1234',
  {
    dialect: (DB_DIALECT as Dialect) || 'postgres',
    host: DB_HOST || 'localhost',
    port: +(DB_PORT || 5432),
    timezone: '-05:00',
  },
);

sequelize.authenticate();

const DB = {
  character: Character(sequelize),
  sequelize,
  Sequelize
};

export default DB;
