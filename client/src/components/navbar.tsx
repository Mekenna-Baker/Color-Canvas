import {Link} from 'react-router-dom'
import './navbar.css'

const Navbar = () => {
    return(
        <div className='nav'>
            <nav>
                <Link to='/' className='link'>Home</Link>
                <Link to='/canvasPage' className='link'>Canvas</Link>

                <Link to='/login' className='link'>Login</Link>
                <Link to='/createAccount' className='link'>Create Account</Link>

            </nav>
        </div>
        
    )
}

export default Navbar
