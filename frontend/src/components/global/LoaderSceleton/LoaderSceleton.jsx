import React from 'react';

const LoaderSceleton = () => {
    return (
        <div className="bg-[var(--card-bg)] p-6 rounded-[20px] shadow-lg mb-8 animate-pulse" id="fact-check-result">
            <div className="h-6 bg-gray-300 rounded w-48 mb-2"></div>
            <div className="result-item bg-white shadow-md p-4 rounded-lg">
                <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-16 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>

                <div className="key-facts mb-4">
                    <div className="h-4 bg-gray-300 rounded w-20 mb-2"></div>
                    <ul className="space-y-2">
                        <li className="h-4 bg-gray-300 rounded w-full"></li>
                        <li className="h-4 bg-gray-300 rounded w-full"></li>
                        <li className="h-4 bg-gray-300 rounded w-full"></li>
                    </ul>
                </div>

                <ul className="space-y-2 mb-4">
                    <li className="h-4 bg-gray-300 rounded w-48"></li>
                    <li className="h-4 bg-gray-300 rounded w-48"></li>
                </ul>
            </div>
            <p className={"text-primary"}>Analyzing facts...</p>
        </div>

    );
};

export default LoaderSceleton;