import React from 'react';

export const ImagePlaceholder = ({ height = 'h-48' }) => {
	return (
		<div className={`${height} bg-gray-200 animate-pulse flex items-center justify-center`}>
			<svg className="w-12 h-12 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
