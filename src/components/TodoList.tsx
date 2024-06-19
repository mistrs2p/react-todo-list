import TodoItem from "./TodoItem";
import { useState } from "react";
import EditModal from "./EditModal"; // import the modal component

export interface Task {
  id: number;
  text: string;
  completed: boolean;
}
function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      text: "Doctor Appointment",
      completed: true,
    },
    {
      id: 2,
      text: "Meeting at School",
      completed: false,
    },
  ]);

  const [text, setText] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  function addTask(event: React.FormEvent<HTMLFormElement>, text: string) {
    event.preventDefault();
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setText("");
  }
  function deleteTask(id: number) {
    setTasks(tasks.filter((task) => task.id !== id));
  }
  function toggleCompleted(id: number) {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        } else {
          return task;
        }
      })
    );
  }

  function editTask(task: Task) {
    setCurrentTask(task);
    setIsModalOpen(true);
  }

  function updateTask(updatedTask: Task) {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setIsModalOpen(false);
  }

  return (
    <div className="todo-list flex flex-col gap-y-5 bg-pink-100 rounded-md p-3 ">
      <div className="overflow-y-auto">
        {tasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            toggleCompleted={toggleCompleted}
            editTask={editTask}
          />
        ))}
      </div>
      <form
        onSubmit={(event) => addTask(event, text)}
        className="w-full flex items-center space-x-2"
      >
        <input
          className="flex-grow border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
          type="submit"
        >
          Add
        </button>
      </form>
      {isModalOpen && currentTask && (
        <EditModal
          task={currentTask}
          updateTask={updateTask}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
export default TodoList;
