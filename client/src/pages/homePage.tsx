import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Home: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [projecsts, setProjects] = useState<any[]>([]);
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

        return {
            <div className="projects-container">
            <h2>Your Projects</h2>
            {projects.length > 0 ? (
                projects.map((project) => (
                    <div>key={project.id} className="project-card"</div>
                    {/*}Replace with actual project display (e.g., ProjectCard component) */}
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    </div>
                ))
            ) : (
                <p>You dont have any projects yet. Start a new one1</p>
                )
                
            )}
        }
    }
 

