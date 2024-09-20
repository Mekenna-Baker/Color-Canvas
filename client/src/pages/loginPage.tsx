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