import TaskForm from "./TaskForm";
import TaskList from "./TaskList"
import { useState, useEffect } from "react";
import axios from "axios"
import './styles.css'

function App() {

  const [tasks, setTasks] = useState([])

  function addTask(taskTitle) {
    axios.post("http://localhost:5000/api/v1/tasks", {name: taskTitle})
      .then((res) => {
        setTasks(tasks => [...tasks, res.data.task])
      })
      .catch((err) => {
        console.log(`Error adding task: ${err}`)
      })
  }

  function toggleComplete(id, completed) {
    axios.patch(`http://localhost:5000/api/v1/tasks/${id}`, {completed: !completed})
      .then(() => {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === id ? { ...task, completed: !task.completed } : task
          )
        );
      })
      .catch((err) => {
        console.log(`Error deleting task: ${err}`)
      })
  }

  function deleteTask(id) {
    axios.delete(`http://localhost:5000/api/v1/tasks/${id}`)
        .then(() => {
          setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id))
        })
      .catch((err) => {
        console.log(`Error deleting task: ${err}`)
      })
  }

  useEffect(() => {
    axios.get("http://localhost:5000/api/v1/tasks")
        .then((res) => {
          setTasks(res.data.tasks)
        })
        .catch((err) => {
          console.log(`Error fetching tasks: ${err}`)
        })
  }, [])

  return (
    <div className="app-container">
      <h1 className="app-title">Todo List</h1>
      <TaskForm addTask={addTask}></TaskForm>
      <TaskList tasks={tasks} deleteTask={deleteTask} toggleComplete={toggleComplete}></TaskList>
    </div>
  );
}

export default App;
