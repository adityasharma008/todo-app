import TaskForm from "./TaskForm";
import TaskList from "./TaskList"
import { useState, useEffect } from "react";
import axios from "axios"

function App() {

  const [tasks, setTasks] = useState([])

  function addTask(taskTitle) {
    axios.post("http://localhost:5000/api/v1/tasks", {name: taskTitle})
      .then((res) => {
        setTasks(tasks => [...tasks, res.data.task])
      })
      .catch((err) => {
        console.log("Error fetching")
      })
  }

  useEffect(() => {
    axios.get("http://localhost:5000/api/v1/tasks")
        .then((res) => {
          setTasks(res.data.tasks)
        })
        .catch((err) => {
          console.log("Error fetching")
        })
  }, [])

  return (
    <div className="app-container">
      <h1 className="app-title">Todo List</h1>
      <TaskForm addTask={addTask}></TaskForm>
      <TaskList tasks={tasks}></TaskList>
    </div>
  );
}

export default App;
