import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { retrieveImages } from '../api/imageAPI';


import logo from '../assets/logo.png'; // Import the logo image from assets folder

interface Project {
  id: number;
  title: string;
  description: string;
  imageData: string; 
  width: number;     
  height: number;    
  assignedUser: {   
    username: string;
  };
}


const Home: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); 
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      const data = await retrieveImages();
      setProjects(data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to retrieve Images')
      setError('Failed to retrieve projects');
      setLoading(false);
    }
  };
   
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      fetchProjects();
    } else {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]);


  const renderContent = () => {
    if (!isLoggedIn) {
      return (
        <div className="welcome-container">
          <h1>Welcome to Color Canvas!</h1>
          <p>"Unleash your creativity, one pixel at a time."</p>
          <img src={logo} alt="Color Canvas Logo" style={{ width: '200px', height: 'auto' }} />
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
    <>
    {renderContent()}
    
      {
        !isLoggedIn ? (
          <div>
            <h1>
              Login to create and View Projects!
            </h1>
          </div>
        ) : (
          <div>
              {projects.map((project) => (
                <div key={project.id}>
                  <img src={project.imageData} width={project.width} height={project.height}></img>
                  <h1>{project.title}</h1>
                  <h3>width: {project.width} Height: {project.height}</h3>
                  <h3>Made by {project.assignedUser.username}</h3>
                </div>
              )
            )};
          </div>
        )
      }
    </>
  );
};

export default Home;