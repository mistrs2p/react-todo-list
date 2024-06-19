import React, { useState } from "react";
import { Task } from "./TodoList";

function EditModal({
  task,
  updateTask,
  closeModal,
}: {
  task: Task;
  updateTask: (updatedTask: Task) => void;
  closeModal: () => void;
}) {
  const [text, setText] = useState<string>(task.text);

  function handleSave() {
    updateTask({ ...task, text });
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-lg font-bold mb-4">Edit Task</h2>
        <input
          className="border border-gray-300 rounded-lg py-2 px-4 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="flex justify-end space-x-2">
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
