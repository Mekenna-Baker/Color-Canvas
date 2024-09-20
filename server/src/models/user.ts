import { DataTypes, Model } from 'sequelize';
import sequelize from './index';

interface UserAttributes {  //define user attributes
    id: number;
    email: string;
    username: string;
    password: string;
}

class User extends Model<UserAttributes> implements UserAttributes {  //define user class
    public id!: number;
    public email!: string;
    public username!: string;
    public password!: string;

    // automatically generated timestamps for creatation and updated

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

//initalize user model 

User.init({
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

    modelName: 'User', //Naming model User, and mapping it to table users
    tableName: 'users',
    timestamps: true, //enable automatic timestamps
    sequelize

});

export default User;