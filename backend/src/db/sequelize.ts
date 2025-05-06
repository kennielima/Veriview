import { Sequelize } from 'sequelize'
import dotenv from "dotenv";
import logger from '../utils/logger';

dotenv.config();

const sequelize = new Sequelize(`${process.env.DATABASE_URL}`, {
  dialect: "postgres",
  host: process.env.DB_HOST,
  // logging: console.log
  // logging: (x: any) => logger.info(x)
});

const testConnection = async () => {
  try {
    await sequelize.sync({ alter: true });
    await sequelize.authenticate();
    logger.info('Connection has been established successfully.');
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
  }
}
testConnection();

export default sequelize;