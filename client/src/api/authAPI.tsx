import {UserLogin} from '../interfaces/userLogin.js';
import { UserCreate } from '../interfaces/userCreate.js';

const login = async (userInfo: UserLogin) => {
    try {
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(userInfo)
        });

        console.log(response)

        const data = await response.json()
        console.log(data)
        if(!response.ok){
             throw new Error('User information not retrieved, check network tab for more information!');
        }

        return data;
    } catch (err: any){
        console.log('Error from user Login:', err);
        return Promise.reject('Could not fetch the user information.')
    }
};

const createAccount = async (userInfo: UserCreate) => {
    try {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userInfo)
        })

        const data = response.json();
        if(!response.ok){
            throw new Error('Invalid API response, check network tab!')
        }
        return data
    } catch (err) {
        console.log('ERROR from User Upload: ', err);
        return Promise.reject("Could not create user");
    }

}

export { login, createAccount};