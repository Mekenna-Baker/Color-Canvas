import {Link} from 'react-router-dom'
import './navbar.css'

const Navbar = () => {
    return(
        <div className='nav'>
            <nav>
                <Link to='/' className='link'>Home</Link>
                <Link to='/canvasPage' className='link'>Canvas</Link>
                <Link to='/login' className='link'>Log In</Link>
                <Link to="/setup" className='link'>Create an Account</Link>

            </nav>
        </div>
        
    )
}

export default Navbar
