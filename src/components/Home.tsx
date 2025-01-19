import { collection, getDocs, updateDoc, doc, arrayUnion, Timestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../config/firebaseConfig";
import { AccountIcon } from "./icons/account";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [todos, setTodos] = useState<any[]>([]); // State to hold tasks fetched from Firestore
  const [selectedTask, setSelectedTask] = useState<any | null>(null); // State to hold the clicked task
  const [isModalVisible, setModalVisible] = useState(false); // State to control modal visibility
  const [contribution, setContribution] = useState<string>(""); // State to hold the contribution input
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
    setContribution(""); // Clear the contribution input
  };

  // Add contribution and update streak count
  const addUpdate = async () => {
    if (!selectedTask || !contribution) return; // Ensure both task and contribution exist

    try {
      // Prepare the contribution object
      const newContribution = {
        date: new Date().toISOString(),
        contribution,
      };

      // Reference the task document in Firestore
      const taskRef = doc(db, "tasks", selectedTask.id);

      // Get the current streak count and the last streak updated timestamp
      const currentStreakCount = selectedTask.streak_count || 0;
      const lastStreakUpdated = selectedTask.last_streak_updated || 0;

      // Get the most recent contribution time
      const lastContribution = selectedTask.contributions?.[selectedTask.contributions.length - 1];
      const currentTime = new Date();
      const lastContributionTime = new Date(lastContribution?.date || 0);
      const timeDifference = currentTime.getTime() - lastContributionTime.getTime();
      const ONE_DAY_IN_MS = 86400000; // 24 hours in milliseconds

      // If there were no contributions in the last 24 hours, reset the streak to 0
      if (timeDifference > ONE_DAY_IN_MS) {
        // Reset streak and update the last_streak_updated timestamp
        await updateDoc(taskRef, {
          contributions: arrayUnion(newContribution), // Add the new contribution to the array
          streak_count: 0, // Reset the streak count to 0
          last_streak_updated: currentTime.toISOString(), // Update the streak update timestamp
          last_updated: Timestamp.fromDate(currentTime), // Update last updated timestamp
        });

        // Update the local state to reflect the reset streak count
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === selectedTask.id
              ? {
                  ...todo,
                  contributions: [...(todo.contributions || []), newContribution],
                  streak_count: 0,
                  last_streak_updated: currentTime.toISOString(),
                }
              : todo
          )
        );

        console.log("No contributions in the last 24 hours. Streak reset to 0.");
      } else {
        // If there was a contribution within the last 24 hours
        const streakUpdateTimeDifference = currentTime.getTime() - new Date(lastStreakUpdated).getTime();

        // Only increment the streak if it's been 24 hours since the last streak update
        if (streakUpdateTimeDifference >= ONE_DAY_IN_MS) {
          // Increment streak count
          await updateDoc(taskRef, {
            contributions: arrayUnion(newContribution), // Add the new contribution to the array
            streak_count: currentStreakCount + 1, // Increment streak count
            last_streak_updated: currentTime.toISOString(), // Update the streak update timestamp
            last_updated: Timestamp.fromDate(currentTime), // Update last updated timestamp
          });

          // Update the local state to reflect the new streak count and contribution
          setTodos((prevTodos) =>
            prevTodos.map((todo) =>
              todo.id === selectedTask.id
                ? {
                    ...todo,
                    contributions: [...(todo.contributions || []), newContribution],
                    streak_count: currentStreakCount + 1,
                    last_streak_updated: currentTime.toISOString(),
                  }
                : todo
            )
          );

          console.log("Contribution added and streak updated!");
        } else {
          console.log("Streak not updated. Already updated within the last 24 hours.");
        }
      }

      closeModal(); // Close the modal after adding the contribution
    } catch (error) {
      console.error("Error updating task:", error.message);
    }
  };

  // Fetch tasks on component mount
  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <>
      <div className="bg-slate-950 min-h-screen flex justify-center items-center">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
          <h1 className="text-4xl font-bold text-center mb-4">Welcome to Streaky 🔥</h1>
          <p className="text-lg text-center mb-6">
            Track Your Daily Tasks and maintain your streaks so that you stay on track and don't break consistency.
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
      </div>

      {/* Modal */}
      {isModalVisible && selectedTask && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">{selectedTask.task_name}</h2>
            <p className="text-lg mb-4">Streak: {selectedTask.streak_count || 0} 💎</p>
            <input
              type="text"
              placeholder="What did you contribute?"
              value={contribution}
              onChange={(e) => setContribution(e.target.value)} // Handle input change
              className="m-4 p-2 border border-gray-300 rounded"
            />
            <button
              onClick={addUpdate}
              className="m-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              Add Contribution
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

      {/* Profile Icon */}
      <div className="fixed bottom-0 right-0 m-4">
        <div className="h-16 w-16 bg-gray-300 rounded-full flex items-center justify-center">
          <button onClick={() => navigate("/profile")}> {/* Wrap navigate call inside a function */}
            <AccountIcon />
          </button>
        </div>
      </div>
    </>
  );
};
