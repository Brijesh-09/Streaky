import React, { useState } from 'react';

const HomeComponent = () => {
    const [selectedTask, setSelectedTask] = useState<string | null>(null);
    const [navigateToPage, setNavigateToPage] = useState(false);

    const handleTaskClick = (task: string) => {
        setSelectedTask(task === selectedTask ? null : task);
    };

    const handleOpenPage = () => {
        setNavigateToPage(true); // Trigger navigation state
    };

    if (navigateToPage) {
        // Render new page when navigation is triggered
        return (
            <div className="min-h-screen bg-gray-200 flex items-center justify-center">
                <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
                    <h1 className="text-4xl font-bold text-center mb-4">Welcome to the New Page!</h1>
                    <p className="text-lg text-center">
                        This is the detailed page for the task. You can add more functionality here.
                    </p>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                        onClick={() => setNavigateToPage(false)} // Go back to the task list
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    const tasks = [
        { name: 'GYM', streak: 2 },
        { name: 'Code', streak: 3 },
        { name: 'Read', streak: 1 },
        { name: 'Work on Business', streak: 3 },
    ];

    return (
        <div className="min-h-screen bg-gray-200 flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
                <h1 className="text-4xl font-bold text-center mb-4">Welcome to Streaky!</h1>
                <p className="text-lg text-center mb-6">
                    Track Your Daily Tasks and maintain your streaks so that you stay on track and don't break consistency.
                </p>

                {/* Task List */}
                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                    <div className="space-y-4">
                        {/* Render tasks with conditional detail card */}
                        {tasks.map((task) => (
                            <div key={task.name}>
                                {/* Task Item */}
                                <div
                                    className="flex justify-between p-2 rounded hover:bg-gray-200 cursor-pointer"
                                    onClick={() => handleTaskClick(task.name)}
                                >
                                    <span>{`- ${task.name}`}</span>
                                    <span>{`${task.streak} 💎`}</span>
                                </div>

                                {/* Render Task Details Above the Clicked Task */}
                                {selectedTask === task.name && (
                                    <div className="bg-white shadow-lg rounded-lg p-4 mt-2 mb-4">
                                        <h2 className="text-lg font-bold text-center">{task.name}</h2>
                                        <p className="text-gray-600 text-center">
                                            Here are the details about your task: <strong>{task.name}</strong>. Keep it up and maintain your streak!
                                        </p>
                                        <button
                                            className="bg-green-500 text-white px-4 py-2 rounded mt-4"
                                            onClick={handleOpenPage} // Navigate to the new page
                                        >
                                            Open Full Details
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeComponent;
