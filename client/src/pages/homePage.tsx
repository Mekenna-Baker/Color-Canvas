import React, { useState, useEffect } from 'react';
import { retrieveImages } from '../api/imageAPI';
import { retrieveImagesbyId } from '../api/imageAPI';
import { retrieveUser } from '../api/userAPI';
import auth from '../utils/auth';

import Error from './errorPage';
import logo from '../assets/logo.png'; // Import the logo image from assets folder
import '../style/homePage.css';

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
          <div className='welcome-container'>
            <img src={logo} width='150' height='150'></img>
            <h3>
              Login or Create an account with us to Create and View Canvases!
            </h3>
          </div>
        ) : (
          <div>
            <div className='welcome-container'>
              <img src={logo} width='150' height='150'></img>
              <h3>Welcome to our site!</h3>
            </div>
            

            <div className='UserProjects-container'>
              <h1>Your Projects</h1>
              <div className='projects'>
                {userProjects.map((project: any) => (
                  <div key={project.id} className='project-card'>
                    <img src={project.imageData} width='100' height={(project.height * 200) / (project.width + project.height)}></img>
                      <h3>{project.title}</h3>
                      <h5>width: {project.width}</h5>
                      <h5>Height: {project.height}</h5>
                  </div>
                ))}
              </div>
              
            </div>
            <div className='projects-container'>
              <h1>All Projects</h1>
              <div className='projects'>
                {projects.map((project) => (
                    <div key={project.id} className='project-card'>
                      <img src={project.imageData} width='100' height={(project.height * 200) / (project.width + project.height)}></img>
                      <h4>{project.title}</h4>
                      <h5>width: {project.width} Height: {project.height}</h5>
                      <h5>Made by {project.assignedUser.username}</h5>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        )
      }

      <button onClick={auth.logout}>Logout</button>
    </>
  );
};

export default Home;
