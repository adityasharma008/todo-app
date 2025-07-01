export default function TaskList(props) {

   return (
      <div>
         <ul>
            {props.tasks.map((task) => (
               <li key={task._id}>
                  {task.name}
               </li>
            ))}
         </ul>
      </div>
   )
}