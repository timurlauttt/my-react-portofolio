import React from 'react';
import ActivityCard from './components/ActivityCard';
import { activitiesData } from './data/constants';

function MyActivities() {
    return (
        <>
            <section id="activities" className="mt-8 w-full h-full text-black border-2 border-black" style={{ backgroundImage: 'url(d.png)' }}>
                <div className="container mx-auto text-center">
                    <h1 className="font-bold mt-8 mb-8 text-lg md:text-2xl">My Activities</h1>
                    <p className="font-normal mt-2 mb-2 p-2 ms-2 sm:ms-0 text-left sm:text-center text-md md:text-lg">Here are some of the activities I've participated during my study, you can click on the cards to find out more!</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-4 mb-8 place-items-center">
                        {activitiesData.map((activity) => (
                            <ActivityCard
                                key={activity.id}
                                title={activity.title}
                                description={activity.description}
                                bgColor={activity.bgColor}
                                link={activity.link}
                                isExternal={activity.isExternal}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

export default MyActivities;