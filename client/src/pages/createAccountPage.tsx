import {useState, ChangeEvent, FormEvent} from "react";
import { createAccount, accountValidity} from "../api/authAPI";
import {login} from '../api/authAPI';
import auth from "../utils/auth";
import '../style/createAccoutPage.css';

const CreateAccountPage = () => {
    const [userCheck, setUserCheck] = useState<boolean>(true)
    const [emailCheck, setEmailCheck] = useState<boolean>(true)
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: ''
    })

    const isEmailValid = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target

        setUserData({
            ...userData,
            [name]: value
        });
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

            //check to see that the username and email dont already exist. 
            const userCheck = await accountValidity(userData);
            const exists = userCheck.exists

            if(!exists && isEmailValid(userData.email)){
                const result = await createAccount(userData)
                console.log('User Uploaded Succesfully: ', result)

                const data = await login(userData)
                auth.login(data.token)
                window.location.assign('/')
            } else if(!exists && !isEmailValid(userData.email)){
                //set if email is invalid
                setEmailCheck(false)
            } else {
                setUserCheck(false)   
            }
    }

    return(
        <div>
            <h1>Create an Account!</h1>

            {userCheck ? (''): (<h3>Username or Email already exists!</h3>)}
            {emailCheck ? (''): (<h3>Email is not valid!</h3>)}

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