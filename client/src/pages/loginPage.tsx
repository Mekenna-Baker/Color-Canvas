<<<<<<< HEAD
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };

      const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setError('Invalid email format. Please enter a valid email.');
            return;
          }

    try {
        const response = await axios.post('/api/auth/login', { email, password });
        
        localStorage.setItem('token', response.data.token);
  
        navigate('/');
      } catch (err) {
        
        setError('Incorrect email or password.');
      }
    };

    return (
        <div className="login-container">
          <h2>Log In</h2>
    
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Error Message Display */}
        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="btn btn-primary">Log In</button>
      </form>

      <p>Don't have an account? <a href="/setup">Create one here</a>.</p>
    </div>
  );
};

export default LoginPage;
=======
import React, { useState, useEffect, ChangeEvent } from 'react';
import Error from '../pages/errorPage';

import Auth from '../utils/auth'
import {login} from '../api/authAPI';

const LoginPage: React.FC = () => {
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });

    //redirect to canvas is user is logged in
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
    };

    //handle login
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = await login(loginData);
            Auth.login(data.token);
        } catch (err: any) {
            console.error('Failed to login:', err)
        }
    };



    return (
        <div className="login-container">
          <form onSubmit={handleSubmit}>
            <h2>Log In</h2>
              <label>Username: </label>
              <input
                type="text"
                name='username'
                value={loginData.username || ''}
                onChange={handleChange}  // Update state on input
                required
              />
              <label>Password: </label>
              <input
                type="password"
                name='password'
                value={loginData.password || ''}
                onChange={handleChange}  // Update state on input
                required
              />
            <button type="submit">Log In</button>  {/* Submit button */}
          </form>
        </div>
      );
    };

    export default LoginPage;
>>>>>>> 9e49dc7376108b27e523c56c2cdb4eb796a681de
