import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
 // Adjust the path based on your file structure

type Task = {
  name: string;
  streak: number;
};

const initialTasks: Task[] = [
];

export const Profile = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [pageVisible, setPageVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");

  const handleTaskClick = (task: Task) => {
    setPageVisible(true);
    setSelectedTask(task);
  };

  const handleClose = () => {
    setPageVisible(false);
    setSelectedTask(null);
  };

  const handleAddNewStreak = () => {
    setAddModalVisible(true);
  };

  const handleAddTaskSubmit = async () => {
    if (newTaskName.trim() === "") return; // Prevent adding empty tasks

    const newTask = {
      task_name: newTaskName.trim(),
      streak_count: 1,
      last_updated: serverTimestamp(),
      userId: "brijesh", // Replace with dynamic userId if applicable
    };

    try {
      await addDoc(collection(db, "tasks"), newTask); // Add task to Firestore
      setTasks((prevTasks) => [...prevTasks, { name: newTask.task_name, streak: newTask.streak_count }]);
      setNewTaskName(""); // Reset the input field
      setAddModalVisible(false); // Close the modal
      console.log("Task added successfully to Firestore!");
    } catch (error) {
      console.error("Error adding task to Firestore: ", error);
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen flex justify-center items-center">
      <div className="bg-gray-200 shadow-lg rounded-lg p-6 max-w-md w-full">
        <h1 className="text-4xl font-bold text-center mb-4">Welcome to Streaky 🔥</h1>
        <p className="text-lg text-center mb-6">
          Track Your Daily Tasks and maintain your streaks so that you
          stay on track and don't break consistency.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg">
          <ul className="space-y-2">
            {tasks.map((task, index) => (
              <li
                key={index}
                className="flex justify-between cursor-pointer hover:bg-gray-300 p-2 rounded"
                onClick={() => handleTaskClick(task)}
              >
                <span>{task.name}</span>
                <span>{task.streak} 💎</span>
              </li>
            ))}
          </ul>
        </div>
        <button
          className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center w-full"
          onClick={handleAddNewStreak}
        >
          ➕ Add New Streak
        </button>
      </div>

      {/* Task Details Modal */}
      {pageVisible && selectedTask && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">{selectedTask.name}</h2>
            <p className="text-lg mb-4">Streak: {selectedTask.streak} 💎</p>
            <p className="text-sm mb-6">Keep going! You're doing great!</p>
            <button
              onClick={handleClose}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Add Task Modal */}
      {isAddModalVisible && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Add New Task</h2>
            <input
              type="text"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
              placeholder="Enter task name"
              className="w-full border border-gray-300 rounded-lg p-2 mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setAddModalVisible(false)}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTaskSubmit}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
