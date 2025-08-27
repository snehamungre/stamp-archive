import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Create = () => {
    const location = useLocation();
    
    useEffect(() => {
        // Scroll to top when the component mounts or route changes
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [location.pathname]); // Dependency on the pathname
    
    return (
        <div className={'create-container flex-center w-3/4 max-w-[80vw] mx-auto pt-10'}>
            <div className='h-dvh'></div>
            <div id='envelope-back' className='px-8'>
                <img src={'assets/images/back.png'} alt="back-envelope" />
            </div>
        </div>
    );
};

export default Create;