import React from 'react';
import { useLocation } from 'react-router-dom';
import Left from './Left'; // Adjust the path as needed

const LeftWrapper = () => {
    const location = useLocation();
    return <Left location={location} />;
};

export default LeftWrapper;
