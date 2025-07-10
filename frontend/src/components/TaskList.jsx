import { useContext } from "react"
import { AppContext } from "../context/AppContext"
import TaskItem from "./TaskItem"

export default function TaskList({ tasks, deleteTask, toggleComplete, editTask }) {
   const { isAuthorized } = useContext(AppContext)

   let message = null

   if (!isAuthorized) {
      message = "Login to view and manage your tasks."
   } else if (tasks.length === 0) {
      message = "No tasks yet! Add one above."
   }

   return (
      <div className="task-list-container">
         {message ? (
            <p className="no-tasks-message">{message}</p>
         ) : (
            <ul className="task-list">
               {tasks.map(task => (
                  <TaskItem
                     key={task._id}
                     task={task}
                     deleteTask={deleteTask}
                     toggleComplete={toggleComplete}
                     editTask={editTask}
                  />
               ))}
            </ul>
         )}
      </div>
   )
}
