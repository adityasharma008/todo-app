export default function TaskItem({task, deleteTask, toggleComplete}) {
   return (
      <li className={`${task.completed? 'completed': ''}`}>
         <span onClick={() => toggleComplete(task._id)} >
            {task.name}
         </span>
         <button onClick={() => deleteTask(task._id)}>delete</button>
      </li>
   )
}


