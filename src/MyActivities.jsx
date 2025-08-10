import React, { useState, useEffect } from 'react';
import ActivityCard from './components/ActivityCard';
import { activitiesService } from './services/serviceWrapper';

function MyActivities() {
    const [activitiesData, setActivitiesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadActivitiesData = async () => {
            try {
                console.log('Loading activities data for main page...');
                setLoading(true);
                setError(null);
                const data = await activitiesService.getAll();
                console.log('Activities data loaded:', data);
                // Sort by activityId ascending (ID 1 first, then 2, 3, etc.)
                const sortedData = data.sort((a, b) => (a.activityId || 0) - (b.activityId || 0));
                setActivitiesData(sortedData);
            } catch (error) {
                console.error('Error loading activities data:', error);
                setError('Failed to load activities data');
                setActivitiesData([]);
            } finally {
                setLoading(false);
            }
        };

        loadActivitiesData();
    }, []);

    if (loading) {
        return (
            <section id="activities" className="mt-8 w-full h-full text-black border-2 border-black" style={{ backgroundImage: 'url(d.png)' }}>
                <div className="container mx-auto text-center">
                    <h1 className="font-bold mt-8 mb-8 text-lg md:text-2xl">My Activities</h1>
                    <div className="flex justify-center items-center py-16">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
                        <span className="ml-3 text-black">Loading activities...</span>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <>
            <section id="activities" className="mt-8 w-full h-full text-black border-2 border-black" style={{ backgroundImage: 'url(d.png)' }}>
                <div className="container mx-auto text-center">
                    <h1 className="font-bold mt-8 mb-8 text-lg md:text-2xl">My Activities</h1>
                    <p className="font-normal mt-2 mb-2 p-2 ms-2 sm:ms-0 text-left sm:text-center text-md md:text-lg">Here are some of the activities I've participated during my study, you can click on the cards to find out more!</p>
                    
                    {activitiesData.length === 0 && !loading ? (
                        <div className="text-center py-16">
                            <div className="bg-white bg-opacity-80 inline-block px-6 py-4 rounded-lg">
                                <p className="text-gray-600 text-lg">No activities available yet.</p>
                                <p className="text-gray-500 text-sm mt-2">Add some activities through the admin panel!</p>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-4 mb-8 place-items-center">
                            {activitiesData.map((activity) => (
                                <ActivityCard
                                    key={activity.id}
                                    title={activity.title}
                                    description={activity.description}
                                    bgColor={activity.bgColor || 'bg-yellow-400'}
                                    link={activity.link}
                                    isExternal={activity.isExternal !== false} // default to true
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}

export default MyActivities;