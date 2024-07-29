// src/contexts/AuthContext.js
import PropTypes from 'prop-types';
import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        setIsAuthenticated(!!token);
    }, []);

    const login = (token) => {
        localStorage.setItem('accessToken', token);
        setIsAuthenticated(true);
        navigate('/');
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        setIsAuthenticated(false);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Ensure PropTypes validation is correct
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthContext;
