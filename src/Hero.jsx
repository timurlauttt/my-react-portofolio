import { Link } from 'react-router-dom';

function Hero() {
    return (
        <>
            <section id="home" className="min-h-[75vh] pt-24 sm:pt-32 md:pt-24 px-4 md:px-40 lg:pt-28 pb-4 bg-white">
                <div className="container mx-auto px-4 md:px-6 rounded shadow-[10px_8px_0_#74247A] p-4 md:p-6 flex flex-col gap-4 items-start justify-center">

                    <div className="flex flex-col items-start text-start">
                        <h1 className="text-start text-2xl sm:text-xl md:text-5xl lg:text-6xl mb-4 leading-tight">
                            Hello, World!
                            <br />
                            <span className="text-3xl md:text-5xl lg:text-6xl font-light">
                                <span className="font-bold">Urip here</span>
                            </span>
                        </h1>
                        <p className="mt-4 text-gray-700 bg-white p-4 shadow-lg max-w-md text-justify">
                            Hello! I'm Urip Yoga Pangestu,
                            a 7th semester Information Systems student at Telkom University Purwokerto who loves challenges,
                            web development enthusiast,
                            and always open to learning new things.
                        </p>
                    </div>
                    <Link to="/portfolio" className="md:text-start mt-8 mb-6 font-bold bg-yellow-400 text-black border-2 border-yellow-400 px-4 py-2 font-syne md:text-lg text-xs uppercase shadow-[4px_6px_0_#74247A] transition-all duration-200 ease-in-out cursor-pointer hover:bg-[#74247A] hover:text-yellow-400 hover:shadow-[4px_4px_0_#ffcc00] w-fit ms-auto sm:ms-0">
                        View My Portfolio
                    </Link>
                </div>
            </section>
        </>
    );
}

export default Hero;
