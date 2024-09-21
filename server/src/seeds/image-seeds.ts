import { Image } from "../models/image";

export const seedImages = async () => {
    await Image.bulkCreate([
        {title: 'coolImage', width: 500, height: 500, imageData: "this is image data", userId: 1},
        {title: 'sadImage', width: 500, height: 500, imageData: "this is image data", userId: 1},
        {title: 'coolImage', width: 500, height: 500, imageData: "this is image data", userId: 2},
        {title: 'coolImage', width: 500, height: 500, imageData: "this is image data", userId: 3},
        {title: 'coolImage', width: 500, height: 500, imageData: "this is image data", userId: 3},
        {title: 'coolImage', width: 500, height: 500, imageData: "this is image data", userId: 4},
    ]);
};