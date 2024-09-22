import {useState, ChangeEvent, FormEvent} from "react";
import { createAccount } from "../api/authAPI";

const CreateAccountPage = () => {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: ''
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target
        setUserData({
            ...userData,
            [name]: value
        });
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const result = await createAccount(userData)
            console.log('User Uploaded Succesfully: ', result)

        } catch (err) {
            console.error('Failed to create new Account:', err)
        }
    }
    return(
        <div>
            <h1>Create an Account!</h1>

            <form onSubmit={handleSubmit}>
                <label>Username: </label>
                <input type="text" name="username" value={userData.username || ''} onChange={handleChange} required/>

                <label>Email: </label>
                <input type="text" name="email" value={userData.email || ''} onChange={handleChange} required/>

                <label>Password: </label>
                <input type="password" name="password" value={userData.password || ''} onChange={handleChange} required/>

                <button type="submit">Create Account</button>
            </form>
        </div>
    );
}

export default CreateAccountPage 