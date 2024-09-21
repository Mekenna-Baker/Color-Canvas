import { User } from "../models/user.js";

export const seedUsers = async () => {
    await User.bulkCreate([
        {username: 'SuperBoy', password: 'password', email: 'superboy@superboy.com'},
        {username: 'SwungaBunga', password: 'password', email: 'eeepBeep@superboy.com'},
        {username: 'sillyguy', password: 'password', email: 'sillyguy@superboy.com'},
        {username: 'emailMan', password: 'password', email: 'iloveemail@superboy.com'},
    ], {individualHooks: true});
};