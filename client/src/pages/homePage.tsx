import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import logo from '../assets/logo.png'; // Import the logo image from assets folder

interface Project {
  id: number;
  title: string;
  description: string;
}

const Home: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // Set to true if logged in
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
       const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
     setIsLoggedIn(false);
    }
    

    if (isLoggedIn) {
      const fetchProjects = async () => {
        try {
          const response = await axios.get('/api/projects');
          setProjects(response.data);
          setLoading(false);
        } catch (err) {
          setError('Error fetching projects');
          setLoading(false);
        }
      };

      fetchProjects();
    } else {
      setLoading(false);
    }
  }, [isLoggedIn]);

  const renderContent = () => {
    if (!isLoggedIn) {
      return (
        <div className="welcome-container">
          <h1>Welcome to Color Canvas!</h1>
          <p>"Unleash your creativity, one pixel at a time."</p>
          <img src={logo} alt="Color Canvas Logo" style={{ width: '200px', height: 'auto' }} />
          <p>
            <Link to="/login" className="btn btn-primary">Log In</Link> or{' '}
            <Link to="/setup" className="btn btn-secondary">Create an Account</Link>
          </p>
        </div>
      );
    } else {
      if (loading) {
        return <div>Loading your projects...</div>;
      }

      if (error) {
        return <div>{error}</div>;
      }

      return (
        <div className="projects-container">
          <h2>Your Projects</h2>
          {projects.length > 0 ? (
            projects.map((project) => (
              <div key={project.id} className="project-card">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            ))
          ) : (
            <p>You don't have any projects yet. Start a new one!</p>
          )}
          <Link to="/create-project" className="btn btn-primary">Start a New Project</Link>
        </div>
      );
    }
  };

  return (
    <div>
      {/* Main content of the homepage */}
      <div className="home-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default Home;