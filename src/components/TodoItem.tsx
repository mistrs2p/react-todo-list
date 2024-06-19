import { Task } from "./TodoList";
import { MdDelete } from "react-icons/md";
import { MdDone } from "react-icons/md";
import { MdEdit } from "react-icons/md";

function TodoItem({
  task,
  deleteTask,
  toggleCompleted,
  editTask,
}: {
  task: Task;
  deleteTask: (id: number) => void;
  toggleCompleted: (id: number) => void;
  editTask: (task: Task) => void;
}) {
  function handleChange() {
    toggleCompleted(task.id);
  }

  return (
    <div
      className={task.completed ? "todo-item todo-item-complete" : "todo-item"}
    >
      <div className="flex gap-x-2">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleChange}
        />
        <button onClick={() => deleteTask(task.id)}>
          <MdDelete color="#ef4444" />
        </button>
        <button onClick={() => editTask(task)}>
          <MdEdit color="#f97316" />
        </button>
      </div>
      <p className="w-full text-right">{task.text}</p>
    </div>
  );
}
export default TodoItem;
