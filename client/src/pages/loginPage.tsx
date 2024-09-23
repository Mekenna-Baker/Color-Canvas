import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './loginPage.css';


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
