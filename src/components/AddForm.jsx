import React, { useState } from 'react';


const AddForm = ({ tasks, onAddTask }) => {
  const [newTask, setNewTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return; 

    const lastId = tasks.length > 0 ? parseInt(tasks[tasks.length - 1].id) : 0;
    const newId = (lastId + 1).toString();

    const newTaskObj = {
      id: newId,
      title: newTask,
      completed: false,
    };

    onAddTask(newTaskObj);
    setNewTask('');
  };

  const handleNewTask = (e) => {
    setNewTask(e.target.value);
  };

  return (
    <div className="add-form-container">
      <form onSubmit={handleSubmit} className="task-form">
        <input
          type="text"
          className="add-input"
          placeholder="Add a new task..."
          value={newTask}
          onChange={handleNewTask}
          required
        />
        <button className="add-btn" type="submit">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddForm;