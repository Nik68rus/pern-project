import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  'pern',
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    dialect: 'postgres',
    host: process.env.DB_HOST as string,
    port: +(process.env.DB_PORT as string),
  }
);

export default sequelize;
