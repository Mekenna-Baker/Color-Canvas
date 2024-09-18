import dotenv from 'dotenv';  // Import dotenv package
dotenv.config();

import { Sequelize } from 'sequelize'; // Import Sequelize from library

// Create a new instance of Sequelize with the database connection URL

const sequelize = process.env.DB_URL  
? new Sequelize(process.env.DB_URL) 
: new Sequelize(process.env.DB_NAME || '',  process.env.DB_USER || '', process.env.DB_PASSWORD, { 
    host: 'localhost',
    dialect: 'postgres',
    dialectOptions: {
        decimalNumbers: true,
    },
});

export default sequelize;