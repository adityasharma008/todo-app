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
      <div className="bg-white rounded-2xl border-2 border-gray-300 p-6 mt-8 task-list-container shadow-[0_-2px_16px_0_rgba(0,0,0,0.08),0_-1.5px_0_0_rgba(0,0,0,0.04)] shadow-top">
         {message ? (
            <p className="text-[#777] italic py-5 no-tasks-message">{message}</p>
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
