import React from 'react';
import auth from '../utils/auth';
import '../style/errorPage.css';

const Error: React.FC = () => {
    return (
        <div>
            <h1>Error!</h1>
            <p>Im sorry, there was an error loading the page.</p>

            <div>
                <button onClick={auth.logout}>Logout</button>
            </div>
        </div>
    )
}

export default Error