import React from 'react';
import { Link } from 'react-router-dom';
import ErrorPageImg from '../../assets/error-page.png'

const ErrorPage = () => {
    return (
        <div className='flex flex-col items-center relative' >
            <img style={{width: "55%"}} className='' src={ErrorPageImg} alt="" />
            <Link to='/' className=' absolute bottom-2 md:bottom-48'><button className="btn btn-error">Go Home Page</button></Link>
        </div>
    );
};

export default ErrorPage;