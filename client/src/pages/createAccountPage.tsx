import {useState, ChangeEvent, FormEvent} from "react";
import { createAccount, accountValidity} from "../api/authAPI";

const CreateAccountPage = () => {
    const [userCheck, setUserCheck] = useState<boolean>(true)
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
            //check to see that the username and email dont already exist. 
            const userCheck  = await accountValidity(userData);
            // const userCheck = false;

            if(userCheck == false){
                const result = await createAccount(userData)
                console.log('User Uploaded Succesfully: ', result)
            } else {
                setUserCheck(false)   
            }
        } catch (err) {
            console.error('Failed to create new Account:', err)
        }
    }

    return(
        <div>
            <h1>Create an Account!</h1>

            {userCheck ? (''): (<h3>Username or Email already exists!</h3>)}

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