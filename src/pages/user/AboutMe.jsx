import { useState, useEffect } from 'react';
import { aboutService } from '../../services/serviceWrapper';

function AboutMe() {
    const [aboutData, setAboutData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAboutData = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await aboutService.getAll();
                setAboutData(data);
            } catch (err) {
                console.error('Error fetching about data:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAboutData();
    }, []);

    // Default data jika belum ada data dari Firebase
    const defaultAboutData = [
        {
            id: 'default-1',
            title: 'My Background',
            description: 'I am a 7th semester Information Systems student who likes challenges, is enthusiastic about web development, and is always open to learning new things.',
            imagePath: 'me.webp',
            order: 1
        },
        {
            id: 'default-2',
            title: 'My Skills',
            description: 'I can use HTML, CSS, and Javascript to build websites. I can also use frameworks like Laravel and Django to create or build websites. I am also currently learning React.JS for front-end development of a website.',
            imagePath: 'me.webp',
            order: 2
        },
        {
            id: 'default-3',
            title: 'My Hobbies',
            description: 'In my free time, I like listening to music, watching football matches, reading and exploring new technologies.',
            imagePath: 'me.webp',
            order: 3
        }
    ];

    // Gunakan data dari Firebase jika ada, jika tidak gunakan default data
    const displayData = aboutData.length > 0 ? aboutData.sort((a, b) => (a.order || 0) - (b.order || 0)) : defaultAboutData;

    if (loading) {
        return (
            <section id="about-me" className="pt-20 w-full text-black pb-8">
                <div className="container mx-auto">
                    <h1 className="font-bold mt-4 mb-4 text-center text-lg md:text-2xl"></h1>
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-black"></div>
                    </div>
                </div>
            </section>
        );
    }

    if (error && aboutData.length === 0) {
        console.warn('Using default about data due to error:', error);
    }

    // Combine the displayData items into sections for a single card
    const backgroundItem = displayData[0] || null;
    const skillsItem = displayData[1] || null;
    const hobbiesItem = displayData[2] || null;

    // Always use the `public/me.webp` image for the About card image
    const cardImage = '/me.webp';

    return (
        <>
            <section id="about-me" className="pt-20 w-full text-black pb-8">
                <div className="container mx-auto">
                    <h1 className="font-bold mt-4 mb-4 text-center text-lg md:text-2xl">About Me</h1>

                    <div className="max-w-7xl mx-auto bg-white rounded-lg p-6 md:p-8 shadow-[10px_8px_0_#74247A]">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                            <div>
                                <h2 className="text-sm font-medium mb-3">{backgroundItem?.title || 'My Background'}</h2>
                                <p className="text-gray-700 mb-4 text-justify">{backgroundItem?.description}</p>
                                <h3 className="text-sm font-medium mb-2">Skills</h3>
                                <p className="text-gray-700 mb-4 text-justify">{skillsItem?.description}</p>

                                <h3 className="text-sm font-medium mb-2">Hobbies</h3>
                                <p className="text-gray-700 text-justify">{hobbiesItem?.description}</p>
                            </div>
                            <div className="flex items-start justify-center">
                                <div className="bg-gray-100 p-4 rounded shadow-inner">
                                    <img src={cardImage} alt={backgroundItem?.title || 'Profile'} className="w-64 h-64 object-cover" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default AboutMe;