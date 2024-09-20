import { DataTypes } from 'sequelize';
import sequelize from './index';

export const UserFactory = () => { //userfactory function creating and returning user model

    const User = sequelize.define('User', { //defining user model

        id: { 
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
            }
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            }
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [8, 100],
            }
        }
    }, {

        tableName: 'users', //defining table name
        timestamps: true, //enable automatic timestamps


    });

    return User; //return user model

};