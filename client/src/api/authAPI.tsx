import {UserLogin} from '../interfaces/userLogin.js';

const login = async (userInfo: UserLogin) => {
    try {
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(userInfo)
        });

        const data = await response.json()
        if(!response.ok) throw new Error('User information not retrieved, check network tab for more information!');
        return data;

    } catch (err: any){
        console.log('Error from user Login:', err);
        return Promise.reject('Could not fetch the user informaion.')
    }
}

export { login };