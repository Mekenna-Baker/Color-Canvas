import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Error from '../pages/errorPage';

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    //redirect to canvas is user is logged in

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/canvas');
        }
    }, [navigate]);

    //handle login

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),  // Send username and password
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                navigate('/canvas'); //redirect to canvas if logged in
            } else {
                const errorData = await response.json();
                setError(errorData.message);
            }
        } catch (err) {
            setError('Error logging in');
        }
    };

//render error component if error

    if (error) {
        return <Error />;
    }

    return (
        <div className="login-container">
          <h2>Log In</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}  // Update state on input
                required
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}  // Update state on input
                required
              />
            </div>
            <button type="submit">Log In</button>  {/* Submit button */}
          </form>
        </div>
      );
    };

    export default LoginPage;
