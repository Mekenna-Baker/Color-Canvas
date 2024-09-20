import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import bcrypt from 'bcrypt';

interface UserAttributes {  //defining attributes for model
    id: number;
    email: string;
    username: string;
    password: string;
}

//interface for defining attributes

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

//defining the User model

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public email!: string;
    public username!: string;
    public password!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public async setPassword(password: string) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(password, saltRounds);

    }

}

//initialize the User model

export function UserFactory(sequelize: Sequelize): typeof User {
    User.init( //defining the User model
        {
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
                },
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                    len: [8, 100],
                },
            },
        },
        {
            tableName: 'users',
            sequelize,
            hooks: {
              beforeCreate: async (user: User) => {
                await user.setPassword(user.password);
              },
              beforeUpdate: async (user: User) => {
                await user.setPassword(user.password);
              },
            }
          }
        );


    return User;
}