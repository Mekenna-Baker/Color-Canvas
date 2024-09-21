import {Link} from 'react-router-dom'
import './navbar.css'

const Navbar = () => {
    return(
        <div className='nav'>
            <nav>
                <Link to='/' className='link'>Home</Link>
                <Link to='/canvasPage' className='link'>Canvas</Link>
            </nav>
        </div>
        
    )
}

export default Navbar
