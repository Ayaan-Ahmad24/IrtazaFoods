// src/Components/PrivateRoute.jsx
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

// Component that handles admin authentication
const PrivateRoute = ({ element, ...rest }) => {
    const isAdminLoggedIn = !!localStorage.getItem('adminToken');

    // Render the component if the admin is logged in, otherwise redirect to login
    return isAdminLoggedIn ? element : <Navigate to="/admin/login" />;
};

export default PrivateRoute;
