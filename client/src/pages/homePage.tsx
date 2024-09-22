import React, { useState, useEffect } from 'react';
import { retrieveImages } from '../api/imageAPI';
import auth from '../utils/auth';

import Error from './errorPage';
import logo from '../assets/logo.png'; // Import the logo image from assets folder

const Home: React.FC = () => {
  //fix this line when the code for login has been added
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // Set to true if logged in
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

  const checkLogin = () => {
    if(auth.loggedIn()){
      setIsLoggedIn(true);
    }
  }
   
  useEffect(() => {
    checkLogin();

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
            <img src={logo} width='150' height='150'></img>
            <h3>
              Login or Create an account with us to Create and View Canvases!
            </h3>
          </div>
        ) : (
          <div>
            <img src={logo} width='150' height='150'></img>
              {projects.map((project) => (
                <div key={project.id}>
                  <img src={project.imageData} width='100' height={(project.height * 200) / (project.width + project.height)}></img>
                  <h2>{project.title}</h2>
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