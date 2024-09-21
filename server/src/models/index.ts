import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';
import { UserFactory } from './user';
import { ImageFactory } from './image';



console.log("DB Name:", process.env.DB_NAME);
console.log("DB User:", process.env.DB_USER);

//initialize the Sequelize instance

const sequelize = process.env.DB_URL
    ? new Sequelize(process.env.DB_URL)
    : new Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASSWORD, {
        host: 'localhost',
        dialect: 'postgres',
        dialectOptions: {
            decimalNumbers: true,
        },
    });

const User = UserFactory(sequelize);
const Image = ImageFactory(sequelize);

User.hasMany(Image, { foreignKey: 'userId', as: 'images', });

sequelize.sync({ alter: true }).then(() => {
    console.log('Database & tables created!');
});


export { sequelize, User, Image };
