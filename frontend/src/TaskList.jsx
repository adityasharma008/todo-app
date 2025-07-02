import TaskItem from "./TaskItem"

export default function TaskList({tasks, deleteTask, toggleComplete, editTask}) {

   return (
      <div className="task-list-container">
         {!tasks || tasks.length === 0 ? (
            <p className="no-tasks-message">No tasks yet! Add one above.</p>
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