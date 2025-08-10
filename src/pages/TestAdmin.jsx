import React from 'react';

const TestAdmin = () => {
    console.log('TestAdmin component rendering...');
    
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow p-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">
                        Admin Panel Test
                    </h1>
                    <p className="text-gray-600 mb-6">
                        This is a simple test component to verify the admin panel is working.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <h3 className="font-semibold text-blue-900">Firebase Status</h3>
                            <p className="text-blue-700 text-sm">Connection: Testing...</p>
                        </div>
                        
                        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                            <h3 className="font-semibold text-green-900">Components</h3>
                            <p className="text-green-700 text-sm">Loading: Success</p>
                        </div>
                        
                        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                            <h3 className="font-semibold text-purple-900">Routes</h3>
                            <p className="text-purple-700 text-sm">Navigation: Working</p>
                        </div>
                    </div>
                    
                    <div className="mt-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">
                            Admin Sections
                        </h2>
                        <ul className="space-y-2">
                            <li className="text-gray-600">✓ Dashboard</li>
                            <li className="text-gray-600">✓ About Management</li>
                            <li className="text-gray-600">✓ Skills Management</li>
                            <li className="text-gray-600">✓ Portfolio Management</li>
                            <li className="text-gray-600">✓ Activities Management</li>
                            <li className="text-gray-600">✓ Contact Management</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestAdmin;
