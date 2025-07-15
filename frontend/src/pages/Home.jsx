import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import Header from "../components/Header";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";


function Home() {
   const { backendUrl, isAuthorized, authReady } = useContext(AppContext);
   const [tasks, setTasks] = useState([]);

   axios.defaults.withCredentials = true;

   function addTask(taskTitle) {
      axios.post(`${backendUrl}/api/v1/tasks`, { taskName: taskTitle })
         .then((res) => {
            setTasks(tasks => [...tasks, res.data.newTask]);
         })
         .catch((err) => {
            console.log(`Error adding task: ${err}`);
         });
   }

   function toggleComplete(id, completed) {
      axios.patch(`${backendUrl}/api/v1/tasks/${id}`, { completed: !completed })
         .then(() => {
            setTasks((prevTasks) =>
               prevTasks.map((task) =>
                  task._id === id ? { ...task, completed: !task.completed } : task
               )
            );
         })
         .catch((err) => {
            console.log(`Error updating task: ${err}`);
         });
   }

   function editTask(id, newName) {
      axios.patch(`${backendUrl}/api/v1/tasks/${id}`, { taskName: newName })
         .then(() => {
            setTasks((prevTasks) =>
               prevTasks.map((task) =>
                  task._id === id ? { ...task, taskName: newName } : task
               )
            );
         })
         .catch((err) => {
            console.log(`Error editing title: ${err}`);
         });
   }

   function deleteTask(id) {
      axios.delete(`${backendUrl}/api/v1/tasks/${id}`)
         .then(() => {
            setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
         })
         .catch((err) => {
            console.log(`Error deleting task: ${err}`);
         });
   }

   useEffect(() => {
      if(!authReady || !isAuthorized) return
      axios.get(`${backendUrl}/api/v1/tasks`)
         .then((res) => {
            setTasks(res.data.tasks);
         })
         .catch((err) => {
            console.log(`Error fetching tasks: ${err}`);
         });
   }, [backendUrl, authReady]);

   return (
    <>
      <div className="fixed top-6 right-10 z-20">
      </div>
      <div className="flex justify-center items-start min-h-screen bg-[#f0f2f5] py-10 px-4 pb-24">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-xl text-center app-container">
          <Header />
          <TaskForm addTask={addTask} />
          <TaskList
            tasks={tasks}
            deleteTask={deleteTask}
            toggleComplete={toggleComplete}
            editTask={editTask}
          />
        </div>
      </div>
      <footer className="fixed bottom-0 left-0 w-full flex justify-center py-4 bg-white border-t border-gray-200 text-sm text-gray-500 shadow-[0_-2px_8px_0_rgba(0,0,0,0.04)] z-10">
        <a href="https://github.com/adityasharma008/todo-app" target="_blank" rel="noopener noreferrer" className="hover:underline">View on GitHub</a>
      </footer>
    </>
  );
}

export default Home;
