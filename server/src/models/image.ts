import { DataTypes } from 'sequelize';
import sequelize from './index';
import { UserFactory } from './user'; 

export const ImageFactory = () => {

    const User = UserFactory(); //initialize user model for foreign key definition

    const Image = sequelize.define('Image', { //define image model

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    width: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    height: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    imageData: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    userId: { //foreign key
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },

        onDelete: 'CASCADE', //deletes all images associated with a user when user is deleted
    }
}, {
    
    tableName: 'images', //defining table as images
    timestamps: true,  //enable automatic timestamps


  });

  return Image;

}