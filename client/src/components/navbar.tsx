import {Link} from 'react-router-dom'

const Navbar = () => {
    return(
        <div className='nav'>
            <nav>
                <Link to='/'>Home</Link>
                <Link to='/canvasPage'>Canvas</Link>
            </nav>
        </div>
        
    )
}

export default Navbar
