import { useState, useEffect } from 'react';
import { aboutService } from './services/serviceWrapper';
import AboutCard from './components/AboutCard';

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
            imagePath: 'me.jpg',
            order: 1
        },
        {
            id: 'default-2',
            title: 'My Skills',
            description: 'I can use HTML, CSS, and Javascript to build websites. I can also use frameworks like Laravel and Django to create or build websites. I am also currently learning React.JS for front-end development of a website.',
            imagePath: 'aku.jpg',
            order: 2
        },
        {
            id: 'default-3',
            title: 'My Hobbies',
            description: 'In my free time, I like listening to music, watching football matches, reading and exploring new technologies.',
            imagePath: 'me2.jpg',
            order: 3
        }
    ];

    // Gunakan data dari Firebase jika ada, jika tidak gunakan default data
    const displayData = aboutData.length > 0 ? aboutData.sort((a, b) => (a.order || 0) - (b.order || 0)) : defaultAboutData;

    if (loading) {
        return (
            <section id="about-me" className="mt-8 w-full h-full text-black py-5 border-2 border-black">
                <div className="container mx-auto">
                    <h1 className="font-bold mt-4 mb-4 text-center text-lg md:text-2xl"></h1>
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-black"></div>
                    </div>
                </div>
            </section>
        );
    }

    if (error && aboutData.length === 0) {
        console.warn('Using default about data due to error:', error);
    }

    return (
        <>
            <section id="about-me" className="mt-8 w-full h-full text-black py-5 border-2 border-black">
                <div className="container mx-auto">
                    <h1 className="font-bold mt-4 mb-4 text-center text-lg md:text-2xl">About Me</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 p-4 gap-12 mt-4 mb-8 justify-center">
                        {displayData.map((item, index) => (
                            <AboutCard
                                key={item.id || `about-${index}`}
                                image={item.downloadURL ? item.downloadURL : `/${item.imagePath}`}
                                title={item.title}
                                description={item.description}
                                imageAlt={item.title || `Profile ${index + 1}`}
                                index={index}
                            />
                        ))}
                    </div>

                    {aboutData.length === 0 && error && (
                        <div className="text-center text-gray-600 mb-4">
                            <p className="text-sm">Displaying default content. Add custom content through the admin panel.</p>
                        </div>
                    )}

                    {/* <div className="text-left ms-4 md:text-center mb-8">
                        <a href="#portofolio" className="mb-10 font-bold bg-yellow-400 text-black border-2 border-yellow-400 px-4 py-2 font-syne text-base uppercase shadow-[4px_6px_0_#74247A] transition-all duration-200 ease-in-out cursor-pointer hover:bg-[#74247A] hover:text-yellow-400 hover:shadow-[4px_4px_0_#ffcc00] w-fit">
                            View My Portfolio
                        </a>
                    </div> */}
                </div>
            </section>
        </>
    );
}

export default AboutMe;