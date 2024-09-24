import React, { useState, FormEvent, ChangeEvent } from 'react';
import Auth from '../utils/auth.js'
import {login} from '../api/authAPI';
import '../style/loginPage.css';

const LoginPage: React.FC = () => {
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const data = await login(loginData);
            Auth.login(data.token);
        } catch (err: any) {
            console.error('Failed to login:', err)
        }
    };



    return (
        <div className="login-page">
          <form onSubmit={handleSubmit}>
            <h2>Log In</h2>
              <label>Username </label>
              <input
                type="text"
                name='username'
                value={loginData.username || ''}
                onChange={handleChange}  // Update state on input
                placeholder='Enter your username here' //placeholder text
                required
              />
              <label>Password </label>
              <input
                type="password"
                name='password'
                value={loginData.password || ''}
                onChange={handleChange}  // Update state on input
                placeholder='Enter your password here' //placeholder text
                required
              />
            <button className='submit' type="submit">Log In</button>  {/* Submit button */}
          </form>
        </div>
      );
    };

    export default LoginPage;