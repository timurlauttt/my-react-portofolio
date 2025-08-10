// Mock Firebase Service for testing
export const mockAboutService = {
    getAll: async () => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return [
            {
                id: '1',
                title: 'About Me',
                description: 'I am a passionate developer',
                image: 'me.jpg',
                imageUrl: '/me.jpg',
                imageAlt: 'Profile Picture'
            }
        ];
    },
    
    getById: async (id) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return {
            id: id,
            title: 'About Me',
            description: 'I am a passionate developer',
            image: 'me.jpg',
            imageUrl: '/me.jpg',
            imageAlt: 'Profile Picture'
        };
    },
    
    create: async (data) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return { id: Date.now().toString(), ...data };
    },
    
    update: async (id, data) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return { id, ...data };
    },
    
    delete: async (id) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return true;
    }
};

export const mockPortfolioService = {
    getAll: async () => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return [
            {
                id: '1',
                title: 'E-Learning Platform',
                description: 'A comprehensive online learning platform',
                image: 'elearning.png',
                imageUrl: '/elearning.png',
                technologies: ['React', 'Laravel'],
                link: 'https://github.com/timurlauttt',
                isExternal: true
            }
        ];
    },
    
    getById: async (id) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return {
            id: id,
            title: 'E-Learning Platform',
            description: 'A comprehensive online learning platform',
            image: 'elearning.png',
            imageUrl: '/elearning.png',
            technologies: ['React', 'Laravel'],
            link: 'https://github.com/timurlauttt',
            isExternal: true
        };
    },
    
    create: async (data) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return { id: Date.now().toString(), ...data };
    },
    
    update: async (id, data) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return { id, ...data };
    },
    
    delete: async (id) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return true;
    }
};
