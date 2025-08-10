import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [authError, setAuthError] = useState(null);

    // Fungsi login
    const login = async (email, password) => {
        try {
            const { signInWithEmailAndPassword } = await import('firebase/auth');
            const { auth } = await import('../firebase');
            const result = await signInWithEmailAndPassword(auth, email, password);
            return result;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            const { signOut } = await import('firebase/auth');
            const { auth } = await import('../firebase');
            return await signOut(auth);
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        }
    };

    const signup = async (email, password) => {
        try {
            const { createUserWithEmailAndPassword } = await import('firebase/auth');
            const { auth } = await import('../firebase');
            return await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error('Signup error:', error);
            throw error;
        }
    };

    useEffect(() => {
        let unsubscribe;
        
        const initializeAuth = async () => {
            try {
                const { onAuthStateChanged } = await import('firebase/auth');
                const { auth } = await import('../firebase');
                
                unsubscribe = onAuthStateChanged(auth, 
                    (user) => {
                        setCurrentUser(user);
                        setLoading(false);
                    },
                    (error) => {
                        console.error('Auth state change error:', error);
                        setAuthError(error);
                        setLoading(false);
                    }
                );
            } catch (error) {
                console.error('Auth initialization error:', error);
                setAuthError(error);
                setLoading(false);
            }
        };

        // Set a timeout to prevent infinite loading
        const timeoutId = setTimeout(() => {
            if (loading) {
                console.warn('Auth initialization timeout');
                setLoading(false);
            }
        }, 5000);

        initializeAuth();

        return () => {
            clearTimeout(timeoutId);
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, []);

    const value = {
        currentUser,
        login,
        logout,
        signup,
        authError,
        loading
    };

    // Always render children after timeout or successful initialization
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
