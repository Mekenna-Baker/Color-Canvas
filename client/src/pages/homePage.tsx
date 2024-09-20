import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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
    }
};

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
