import React, { createContext, useState, useEffect, useContext } from 'react';
import { authService } from './services/authService';

export const AuthContext = createContext({
    isAuthenticated: false,
    login: () => { },
    logout: () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        authService.isAuthenticated().then((auth) => {
            setIsAuthenticated(auth);
            setLoading(false);
        });
    }, []);

    const login = () => setIsAuthenticated(true);

    const logout = async () => {
        await authService.logout();
        setIsAuthenticated(false);
    };

    if (loading) return (
        <React.Fragment>
            <div style={{ padding: 20, color: '#333' }}>Loading Auth Context...</div>
        </React.Fragment>
    );

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
