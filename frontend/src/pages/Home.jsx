import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import Header from "../components/Header";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";



function Home() {
   const { backendUrl } = useContext(AppContext);
   const [tasks, setTasks] = useState([]);

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
      axios.get(`${backendUrl}/api/v1/tasks`)
         .then((res) => {
            setTasks(res.data.tasks);
         })
         .catch((err) => {
            console.log(`Error fetching tasks: ${err}`);
         });
   }, [backendUrl]);

   return (
      <div className="app-container">
         <Header />
         <TaskForm addTask={addTask} />
         <TaskList
            tasks={tasks}
            deleteTask={deleteTask}
            toggleComplete={toggleComplete}
            editTask={editTask}
         />
      </div>
   );
}

export default Home;
