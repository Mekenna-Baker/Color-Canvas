import React, { useState, useEffect } from 'react';
import { retrieveImages } from '../api/imageAPI';

import Error from './errorPage';
import logo from './assets/logo.png'; // Import the logo image from assets folder

const Home: React.FC = () => {
  //fix this line when the code for login has been added
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true); // Set to true if logged in
  const [projects, setProjects] = useState<any[]>([]);
  const [error, setError] = useState<boolean | null>(null);

<<<<<<< HEAD
    useEffect(() => {

        if (isLoggedIn) {
            const fetchProjects = async () => {
                try {
                    const response = await axios.get('/api/projects');
                    setProjects(response.data);
                    setLoading(false);
                } catch (error) {
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
                    <h1>Welcome to Color Canvas !</h1>
                    <p>"Unleash your creativity, one pixel at a time."</p>
                    <img src="put logo here" alt="Color Canvas" />
                    <p>
                        <Link to="/login" className="btn btn-primary">Log In/</Link> or{''}
                        <Link to="/setup" className="btn btn-secondary">Create an Account</Link>
                    </p>
                </div>
            );
        } else {
            if (loading) {
                return <div>Loading you projects...</div>
            }
            
            if (error) {
                return <div>{error}</div>
            }

            return (
                <div className="projects-container">
                    <h2>Your Projects</h2>

                    <div>
                    { projects.length > 0 ? ( projects.map((project) => (
                        <div key={project.id} className="project-card">
                            {/*Replace with actual project display (e.g., ProjectCard component) */}
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>
                        </div>
                        ))
                    ) : (
                    <p>You dont have any projects yet. Start a new one1</p>
                    )}
                    </div>
<<<<<<< HEAD
                ))
            ) : (
                <p>You dont have any projects yet. Start a new one!</p>
            )}
            <Link to="/create-project" className="btn btn-primary">Start a New Project</Link>
            </div>
        );
=======
  const fetchProjects = async () => {
    try {
      const data = await retrieveImages();
      setProjects(data);
      
    } catch (err) {
      console.error('Failed to retrieve Images')
      setError(true);
>>>>>>> 9e49dc7376108b27e523c56c2cdb4eb796a681de
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

<<<<<<< HEAD
return (
    <div>
        <Navbar /> {/*Navbar with Links*/}

        <div></div>
    </div>
)

                
    

=======
                </div>
            )
        }
    }         
}
>>>>>>> a6493e5633cdd66a44bdba11d0b984cbeafad7e6
=======
export default Home;
>>>>>>> 9e49dc7376108b27e523c56c2cdb4eb796a681de
