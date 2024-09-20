import { DataTypes, Sequelize, Model, Optional} from 'sequelize';
import { User } from './user';

interface ImageAttributes { //defining attributes for model
    id: number;
    title: string;
    width: number;
    height: number;
    imageData: string;
    userId: number;

}

//interface for defining attributes 

interface ImageCreationAttributes extends Optional<ImageAttributes, 'id'> {}

//defining the Image model

export class Image extends Model<ImageAttributes, ImageCreationAttributes> implements ImageAttributes
 {

    public id!: number;
    public title!: string;
    public width!: number;
    public height!: number;
    public imageData!: string;
    public userId!: number; // Foreign key to user model

    public readonly createdAt!: Date; //timestamps
    public readonly updatedAt!: Date;
}

//initialize the Image model

export function ImageFactory(sequelize: Sequelize): typeof Image {
    Image.init( //defining the Image model
        {

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

    },

}, {
    
    tableName: 'images', //defining table as images
    sequelize, //pass the sequelize instance
    timestamps: true,  //enable automatic timestamps
  });


  Image.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
    onDelete: 'CASCADE',

    });

  return Image;

}