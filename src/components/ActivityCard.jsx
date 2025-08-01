import React from 'react';

const ActivityCard = ({ title, description, bgColor = "bg-yellow-400" }) => {
    return (
        <div className={`w-40 aspect-square ${bgColor} border-2 border-black shadow-[4px_4px_0_#000] hover:scale-105 transition-all cursor-pointer flex flex-col`}>
            <div className="p-2 text-xs flex flex-col flex-grow justify-between bg-white min-h-[120px]">
                <h5 className="font-bold text-start">{title}</h5>
                <p className="text-gray-700 mt-1 text-start">{description}</p>
            </div>
        </div>
    );
};

export default ActivityCard;
