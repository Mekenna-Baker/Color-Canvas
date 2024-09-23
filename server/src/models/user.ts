import { DataTypes, Model, Sequelize, Optional } from 'sequelize';
import bcrypt from 'bcrypt';

interface UserAttributes {  //defining attributes for model
    id: number;
    email: string;
    username: string;
    password: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {  //define user class
    public id!: number;
    public email!: string;
    public username!: string;
    public password!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public async setPassword(password: string){
        const saltRounds = 10;
        this.password = await bcrypt.hash(password, saltRounds)
    }
}

//initialize the User model

export function UserAssembely(sequelize: Sequelize): typeof User {
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
        sequelize,
        hooks: {
            beforeCreate: async (user: User) => {
                await user.setPassword(user.password);
            },
            beforeUpdate: async (user: User) => {
                if(user.changed('password')) {
                    await user.setPassword(user.password);
                }  
            },
        }
    
    });

    return User
}


export default User;