import { Sequelize } from 'sequelize'
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(`${process.env.DATABASE_URL}`, {
  dialect: "postgres",
  host: process.env.DB_HOST,
  logging: console.log
});

const testConnection = async () => {
  try {
    await sequelize.sync({ alter: true });
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
testConnection();

export default sequelize;