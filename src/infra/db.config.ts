import logger from '@src/utils/logger';
import mongoose from 'mongoose';

const { DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME } = process.env;

export const db = {
  init: () => {
    logger.info(`mongodb://${DB_USER}:${DB_PASS}@db:${DB_PORT}/${DB_NAME}`);
        mongoose
          .connect(
            `mongodb://${DB_USER}:${DB_PASS}@db:${DB_PORT}/${DB_NAME}?authSource=admin`
          )
          .then((res) => logger.info(`Connection Succesful ${res}`))
          .catch((err) => logger.error(`Erro in DB connection: ${err}`));
    }

}