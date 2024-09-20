import { DataTypes, Model } from 'sequelize';
import sequelize from './index';
import User from './user';

interface ImageAttributes {
    id: number;
    title: string;
    width: number;
    height: number;
    imageData: string;
    userId: number;

}

class Image extends Model<ImageAttributes> implements ImageAttributes {
    public id!: number;
    public title!: string;
    public width!: number;
    public height!: number;
    public imageData!: string;
    public userId!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Image.init({
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
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },

        onDelete: 'CASCADE',
    }
}, {
    
    modelName: 'Image',
    tableName: 'images',
    timestamps: true,
    sequelize,

  });

  export default Image;