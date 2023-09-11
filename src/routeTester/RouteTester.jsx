import React from 'react';
import {useLocation} from 'react-router-dom'

const RouteTester = () => {
    const location = useLocation();
    console.log(location.pathname);
    return(`${location.pathname}`);
}

export default RouteTester;