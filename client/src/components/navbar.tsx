import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import auth from '../utils/auth';
import './navbar.css'

const Navbar = () => {
    const [loginCheck, setLoginCheck] = useState(false);

    const checkLogin = () => {
        if(auth.loggedIn()){
            setLoginCheck(true)
        }
    };

    useEffect(() => {
        console.log(loginCheck);
        checkLogin();
    }, [loginCheck])

    return(
        <div className='nav'>
            <nav>
                <Link to='/' className='link'>Home</Link>
                {
                    !loginCheck ? ('') : (<Link to='/canvasPage' className='link'>Canvas</Link>)
                }
                <Link to='/login' className='link'>Log In</Link>
                <Link to="/create" className='link'>Create an Account</Link>

            </nav>
        </div>
        
    )
}

export default Navbar
