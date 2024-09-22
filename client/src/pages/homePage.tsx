import React, { useState, useEffect } from 'react';
import { retrieveImages } from '../api/imageAPI';

import Error from './errorPage';
import logo from '../assets/logo.png'; // Import the logo image from assets folder

const Home: React.FC = () => {
  //fix this line when the code for login has been added
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true); // Set to true if logged in
  const [projects, setProjects] = useState<any[]>([]);
  const [error, setError] = useState<boolean | null>(null);

  const fetchProjects = async () => {
    try {
      const data = await retrieveImages();
      setProjects(data);
      
    } catch (err) {
      console.error('Failed to retrieve Images')
      setError(true);
    }
  };
   
  useEffect(() => {
    if (isLoggedIn) {
        fetchProjects()
    }
  }, [isLoggedIn]);

  
  if (error) {
    return <Error />
  }

  return (
    <>
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
                  <img src={project.imageData} width={project.width * .5} height={project.height * .5}></img>
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