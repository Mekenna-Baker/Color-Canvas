import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './signupPage.css';


const SignUpPage = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const isEmailValid = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };
    
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        // Email validation
        if (!isEmailValid(email)) {
          setErrorMessage('Please enter a valid email address.');
          return;
        }

        // Prepare data for API request
    const newUser = {
        email,
        username,
        password,
      };
  
      try {
        // Make POST request to the backend API to create a new user
        const response = await axios.post('/api/auth/signup', newUser);
        
        // Assuming the response contains a JWT token for login
        localStorage.setItem('token', response.data.token);
        
        // Navigate to the homepage after successful signup
        navigate('/');
      } catch (error) {
        setErrorMessage('Error during sign-up. Please try again.');
      }
    };

    return (
        <div className="sign-up-page">
          <h1>Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button type="submit">Sign Up</button>
          </form>
        </div>
      );
    };
    
    export default SignUpPage;