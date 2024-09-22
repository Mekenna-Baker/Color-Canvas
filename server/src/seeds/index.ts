import { sequelize } from "../models/index.js";
import { seedUsers } from "./user-seeds.js";
import { seedImages } from "./image-seeds.js";

const seedAll = async (): Promise<void> => {
    try {
        await sequelize.sync({ force: true});
        console.log('\n------ DATABASE SYNCED ------\n')

        await seedUsers();
        console.log('\n------ USERS SEEDED ------\n');

        await seedImages();
        console.log('\n------- IMAGES SEEDED -------\n')

        process.exit(0);
    } catch (err) {
        console.error('Error seeding Database:', err);
        process.exit(1);
    }
};

seedAll();