import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../config/firebaseConfig";
import { AccountIcon } from "./icons/account";
import { useNavigate } from "react-router-dom";


export const Home = () => {
  const [todos, setTodos] = useState<any[]>([]); // State to hold tasks fetched from Firestore
  const [selectedTask, setSelectedTask] = useState<any | null>(null); // State to hold the clicked task
  const [isModalVisible, setModalVisible] = useState(false); // State to control modal visibility
  const navigate = useNavigate();
  // Fetch tasks from Firestore
  const fetchPost = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "tasks"));
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTodos(newData);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Handle task click
  const handleTaskClick = (task: any) => {
    setSelectedTask(task); // Set the clicked task
    setModalVisible(true); // Show the modal
  };

  // Close the modal
  const closeModal = () => {
    setSelectedTask(null); // Clear the selected task
    setModalVisible(false); // Hide the modal
  };

  // Fetch tasks on component mount
  useEffect(() => {
    fetchPost();
  }, []);

  const addUpdate = () => {
    console.log("adding..... ")
  }

  return (
    <><div className="bg-slate-950 min-h-screen flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <h1 className="text-4xl font-bold text-center mb-4">Welcome to Streaky 🔥</h1>
        <p className="text-lg text-center mb-6">
          Track Your Daily Tasks and maintain your streaks so that you
          stay on track and don't break consistency.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg">
          <ul className="space-y-2">
            {todos.length > 0 ? (
              todos.map((todo) => (
                <li
                  key={todo.id}
                  className="flex justify-between bg-white shadow-md rounded p-2 hover:bg-gray-300 cursor-pointer"
                  onClick={() => handleTaskClick(todo)} // Trigger the click handler
                >
                  <span>{todo.task_name || "Unnamed Task"}</span>
                  <span>{todo.streak_count || 0} 💎</span>
                </li>
              ))
            ) : (
              <li className="text-center text-gray-500">No tasks found!</li>
            )}
          </ul>
        </div>
      </div>

      {/* Modal */}
      {isModalVisible && selectedTask && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">{selectedTask.task_name}</h2>
            <p className="text-lg mb-4">Streak: {selectedTask.streak_count} 💎</p>
            <input type="des" placeholder="What did you contributed" className="m-4"></input>
            <button
              onClick={addUpdate}
              className="m-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
              Add
            </button>
            <button
              onClick={closeModal}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
    <div className="fixed bottom-0 right-0 m-4">
      <div className="h-16 w-16 bg-gray-300 rounded-full flex items-center justify-center">
        <button onClick={() => navigate('/profile')}> {/* Wrap navigate call inside a function */}
          <AccountIcon />
        </button>
      </div>
    </div>

    </>
  );
};
