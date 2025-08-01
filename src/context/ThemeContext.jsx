import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setIsDarkMode(savedTheme === 'dark');
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = !isDarkMode;
        setIsDarkMode(newTheme);
        localStorage.setItem('theme', newTheme ? 'dark' : 'light');
        
        // Apply to document
        if (newTheme) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    const value = {
        isDarkMode,
        toggleTheme,
        theme: isDarkMode ? 'dark' : 'light'
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};
};

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    
    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    const theme = {
        colors: {
            primary: isDarkMode ? '#1a1a1a' : '#ffffff',
            secondary: isDarkMode ? '#2d2d2d' : '#f5f5f5',
            accent: '#FFC700',
            purple: '#74247A'
        }
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme }}>
            {children}
        </ThemeContext.Provider>
    );
};
