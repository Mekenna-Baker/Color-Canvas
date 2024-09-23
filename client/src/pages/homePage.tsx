import React, { useState, useEffect } from 'react';
import { retrieveImages } from '../api/imageAPI';
import { retrieveImagesbyId } from '../api/imageAPI';
import { retrieveUser } from '../api/userAPI';
import auth from '../utils/auth';

import Error from './errorPage';
import logo from '../assets/logo.png'; // Import the logo image from assets folder

const Home: React.FC = () => {
  //fix this line when the code for login has been added
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // Set to true if logged in
  const [projects, setProjects] = useState<any[]>([]);
  const [userProjects, setUserProjects] = useState<any[any]>([]);
  const [error, setError] = useState<boolean | null>(null);

  const fetchUserProjects = async () => {
    try {
      const usernameData = auth.getProfile()
      const userData = await retrieveUser(usernameData.username);

      const projectsData = await retrieveImagesbyId(userData.id);
      setUserProjects(projectsData)

      console.log(projectsData)

    } catch (err) {
      console.error('Failed to retrieve User Projects')
      setError(true)
    }
  }

  const fetchProjects = async () => {
    try {
      const data = await retrieveImages();
      setProjects(data);
      
    } catch (err) {
      console.error('Failed to retrieve projects')
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
      fetchUserProjects()
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

            <div>
              <h3>Your Projects</h3>
              {userProjects.map((project: any) => (
                <div key={project.id}>
                  <img src={project.imageData} width='100' height={(project.height * 200) / (project.width + project.height)}></img>
                    <h2>{project.title}</h2>
                    <h3>width: {project.width} Height: {project.height}</h3>
                </div>
              ))}
            </div>
            <div>
              <h3>All Projects!</h3>
              {projects.map((project) => (
                  <div key={project.id}>
                    <img src={project.imageData} width='100' height={(project.height * 200) / (project.width + project.height)}></img>
                    <h2>{project.title}</h2>
                    <h3>width: {project.width} Height: {project.height}</h3>
                    <h3>Made by {project.assignedUser.username}</h3>
                  </div>
                )
              )}
            </div>
          </div>
        )
      }

      <button onClick={auth.logout}>Logout</button>
    </>
  );
};

export default Home;