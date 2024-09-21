import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';
import { UserAssembely } from './user.js';
import { ImageAssembelly } from './image.js';

const sequelize = process.env.DB_URL
    ? new Sequelize(process.env.DB_URL)
    : new Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASSWORD, {
        host: 'localhost',
        dialect: 'postgres',
        dialectOptions: {
            decimalNumbers: true,
        },
    });

const User = UserAssembely(sequelize);
const Image = ImageAssembelly(sequelize)

User.hasMany(Image, {foreignKey: 'userId'});
Image.belongsTo(User, {foreignKey: 'userId', as: 'assignedUser'})

export {sequelize, User, Image};
