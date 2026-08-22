import React from 'react';

export const ImagePlaceholder = ({ height = 'h-48' }) => {
	return (
		<div className={`${height} w-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center`}>
			<svg className="w-10 h-10 text-neutral-400 dark:text-neutral-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M3 3h18v18H3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
				<path d="M8 14l3-3 2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		</div>
	);
};

export default function Loading() {
	return (
		<div className="p-4">
			<div className="h-4 bg-gray-200 rounded mb-2 w-3/4 animate-pulse"></div>
			<div className="h-4 bg-gray-200 rounded mb-2 w-1/2 animate-pulse"></div>
		</div>
	);
}
