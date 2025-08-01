function MyActivies() {
    return (
        <>
            <section id="activities" className="mt-8 w-full h-full text-black border-2 border-black" style={{ backgroundImage: 'url(d.png)' }}>
                <div className="container mx-auto text-center">
                    <h1 className="font-bold mt-8 mb-8 text-lg md:text-2xl">My Activities</h1>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-4 mb-8 place-items-center">

                        {/* Card 1 */}
                        <div className="w-40 aspect-square bg-yellow-400 border-2 border-black shadow-[4px_4px_0_#000] hover:scale-105 transition-all cursor-pointer flex flex-col">
                            <div className="p-2 text-xs flex flex-col flex-grow justify-between bg-white min-h-[120px]">
                                <h5 className="font-bold text-start">HMSI Member</h5>
                                <p className="text-gray-700 mt-1 text-start">I am a member of the Information Systems Student Association for the 2023/2024 period</p>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="w-40 aspect-square bg-red-400 border-2 border-black shadow-[4px_4px_0_#000] hover:scale-105 transition-all cursor-pointer flex flex-col">
                            <div className="p-2 text-xs flex flex-col flex-grow justify-between bg-white min-h-[120px]">
                                <h5 className="font-bold text-start">Todays Committee</h5>
                                <p className="text-gray-700 mt-1 text-start">I participated in campus orientation activities and served as a group mentor for 24 new students</p>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="w-40 aspect-square bg-blue-400 border-2 border-black shadow-[4px_4px_0_#000] hover:scale-105 transition-all cursor-pointer flex flex-col">
                            <div className="p-2 text-xs flex flex-col flex-grow justify-between bg-white min-h-[120px]">
                                <h5 className="font-bold text-start">PraktisiDays Committee</h5>
                                <p className="text-gray-700 mt-1 text-start">I also participated in the Information Systems study program orientation committee at ITTP in 2024</p>
                            </div>
                        </div>

                        {/* Card 4 */}
                        <div className="w-40 aspect-square bg-green-400 border-2 border-black shadow-[4px_4px_0_#000] hover:scale-105 transition-all cursor-pointer flex flex-col">
                            <div className="p-2 text-xs flex flex-col flex-grow justify-between bg-white min-h-[120px]">
                                <h5 className="font-bold text-start">Orphanage Social Service</h5>
                                <p className="text-gray-700 mt-1 text-start">I also participated in social service activities at Harapan Mulya Orphanage Purwokerto</p>
                            </div>
                        </div>

                        {/* Card 5 */}
                        <div className="w-40 aspect-square bg-purple-400 border-2 border-black shadow-[4px_4px_0_#000] hover:scale-105 transition-all cursor-pointer flex flex-col">
                            <div className="p-2 text-xs flex flex-col flex-grow justify-between bg-white min-h-[120px]">
                                <h5 className="font-bold text-start">Dies Natalis Closing</h5>
                                <p className="text-gray-700 mt-1 text-start">I also participated in the Information Systems Study Program Dies Natalis Closing event 2023</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto text-center">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-4 mb-8 place-items-center">

                        {/* Card 1 */}
                        <div className="w-40 aspect-square bg-yellow-400 border-2 border-black shadow-[4px_4px_0_#000] hover:scale-105 transition-all cursor-pointer flex flex-col">
                            <div className="p-2 text-xs flex flex-col flex-grow justify-between bg-white min-h-[120px]">
                                <h5 className="font-bold text-start">Art Gallery Night</h5>
                                <p className="text-gray-700 mt-1 text-start">I was also a committee member for the art gallery night at Telkom Institute of Technology Purwokerto 2023</p>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="w-40 aspect-square bg-red-400 border-2 border-black shadow-[4px_4px_0_#000] hover:scale-105 transition-all cursor-pointer flex flex-col">
                            <div className="p-2 text-xs flex flex-col flex-grow justify-between bg-white min-h-[120px]">
                                <h5 className="font-bold text-start">Infection 4.0</h5>
                                <p className="text-gray-700 mt-1 text-start">I also participated in faculty orientation activities as a committee member in the event division</p>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="w-40 aspect-square bg-blue-400 border-2 border-black shadow-[4px_4px_0_#000] hover:scale-105 transition-all cursor-pointer flex flex-col">
                            <div className="p-2 text-xs flex flex-col flex-grow justify-between bg-white min-h-[120px]">
                                <h5 className="font-bold text-start">Care For New Students</h5>
                                <p className="text-gray-700 mt-1 text-start">I also participated in the Information Systems study program orientation committee at ITTP in 2023</p>
                            </div>
                        </div>

                        {/* Card 4 */}
                        <div className="w-40 aspect-square bg-green-400 border-2 border-black shadow-[4px_4px_0_#000] hover:scale-105 transition-all cursor-pointer flex flex-col">
                            <div className="p-2 text-xs flex flex-col flex-grow justify-between bg-white min-h-[120px]">
                                <h5 className="font-bold text-start">Faculty Election 2023</h5>
                                <p className="text-gray-700 mt-1 text-start">I was a committee member for the Faculty of Informatics General Election 2023 and became event division staff</p>
                            </div>
                        </div>

                        {/* Card 5 */}
                        <div className="w-40 aspect-square bg-purple-400 border-2 border-black shadow-[4px_4px_0_#000] hover:scale-105 transition-all cursor-pointer flex flex-col">
                            <div className="p-2 text-xs flex flex-col flex-grow justify-between bg-white min-h-[120px]">
                                <h5 className="font-bold text-start">Community Service</h5>
                                <p className="text-gray-700 mt-1 text-start">I was part of community service in Taman Sari village in June 2023</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}

export default MyActivies;