import { Sequelize } from 'sequelize';

import dotenv from 'dotenv';
dotenv.config();


const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASSWORD || '', {
      host: process.env.DB_HOST || 'localhost',
      dialect: 'postgres',
      dialectOptions: {
        decimalNumbers: true,
      },
  });




export default sequelize;