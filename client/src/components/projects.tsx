interface ProjectsProps {
    title: string;
    width: number;
    height: number;
    imageData: string;
    assignedUser: {
        username: string;
    };
}

const Projects = ({ title, width, height, imageData, assignedUser: { username } }: ProjectsProps) => {
    return (
        <div>
            <h1>{title}</h1>
            <img src={imageData} width={width} height={height} alt={title} />
            <h3>Made by {username}</h3>
        </div>
    );
}

export default Projects;
