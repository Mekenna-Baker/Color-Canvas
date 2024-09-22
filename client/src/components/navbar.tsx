import {Link} from 'react-router-dom'
import './navbar.css'

const Navbar = () => {
    return(
        <div className='nav'>
            <nav>
                <Link to='/' className='link'>Home</Link>
                <Link to='/canvasPage' className='link'>Canvas</Link>
                <Link to="/login" className="btn btn-primary">Log In</Link> or{' '}
                <Link to="/setup" className="btn btn-secondary">Create an Account</Link>
            </nav>
        </div>
        
    )
}

export default Navbar
