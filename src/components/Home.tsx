import React, { useState } from 'react'


type Task = {
    name: string,
    streak: number
}

const task: Task[] = [
    {
        name: 'Gym',
        streak: 2

    },
    {
        name: 'Code',
        streak: 4

    },

    {
        name: 'READ BOOK',
        streak: 2

    }, {
        name: 'WALK',
        streak: 2

    },


]



export const Home = () => {
    const[pageVisible , setpageVisible] = useState(false)
    const[selectedTask , setselectedTask] = useState<Task | null>(null);

    const handleTaskClick = (task:Task) =>{
        setpageVisible(true)
        setselectedTask(task)
    }

    const handleClose = () => {
        setpageVisible(false)
        setselectedTask(null)
    }


    return (
        <div className='bg-gray-200 min-h-screen flex justify-center items-center'>

            <div className='bg-white shadow-lg rounded-lg p-6 max-w-md w-full'>
                <h1 className='text-4xl font-bold text-center mb-4'>Welcome to Streaky 🔥</h1>
                <p className='text-lg text-center mb-6'>
                    Track Your Daily Task and, maintain your streaks so that you
                    stay on track and don't break consistency.
                </p>
                <div className="bg-gray-100 p-4 rounded-lg">
                <ul className="space-y-2">
            {/* Render the tasks list */}
            {task.map((task, index) => (
              <li
                key={index}
                className="flex justify-between cursor-pointer hover:bg-gray-300 p-2 rounded"
                onClick={() => handleTaskClick(task)} // Handle task click
              >
                <span>{task.name}</span>
                <span>{task.streak} 💎</span>
              </li>
            ))}
          </ul>
                </div>
            </div>
            {pageVisible && selectedTask && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">{selectedTask.name}</h2>
            <p className="text-lg mb-4">Streak: {selectedTask.streak} 💎</p>
            <p className="text-sm mb-6">Keep going! You're doing great!</p>
            <button
              onClick={handleClose}
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
        </div>
        
    )
}