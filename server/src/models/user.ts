import { DataTypes, Model } from 'sequelize';
import sequelize from './index';

interface UserAttributes {
    id: number;
    email: string;
    username: string;
    password: string;
}

class User extends Model<UserAttributes> implements UserAttributes {
    public id!: number;
    public email!: string;
    public username!: string;
    public password!: string;

    // timestamps 

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

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
    
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    sequelize
        
});

export default User;