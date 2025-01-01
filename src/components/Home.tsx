import React from 'react';

const HomeComponent = () => {
    return (
        <div className="min-h-screen bg-grey-200 flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
                <h1 className="text-4xl font-bold text-center mb-4">Welcome to Streaky!</h1>
                <p className="text-lg text-center mb-6">
                    Track Your Daily Task and, maintain your streaks so that you 
                    stay on track and don't break consistency.
                </p>
                <div className="bg-gray-100 p-4 rounded-lg">
                    <ul className="space-y-2">
                        <li className="flex justify-between">
                            <span>- GYM</span>
                            <span>2 💎</span>
                        </li>
                        <li className="flex justify-between">
                            <span>- Code</span>
                            <span>3 💎</span>
                        </li>
                        <li className="flex justify-between">
                            <span>- Read</span>
                            <span>1 💎</span>
                        </li>
                        <li className="flex justify-between">
                            <span>- Work on Business</span>
                            <span>3 💎</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default HomeComponent;
