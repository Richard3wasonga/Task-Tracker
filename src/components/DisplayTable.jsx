import React from 'react';


const DisplayTable = ({ tasks, setTasks }) => {
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://task-traker-server.vercel.app/tasks/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete the task on the server');
      }

      const removedTasks = tasks.filter(task => task.id !== id);
      setTasks(removedTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleChecked = (id) => {
    const doneTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(doneTasks);

    const updatedDoneTask = doneTasks.find(task => task.id === id);

    fetch(`https://task-traker-server.vercel.app/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: updatedDoneTask.id,
        title: updatedDoneTask.title,
        completed: updatedDoneTask.completed,
      }),
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  };

  const handleEdit = (id) => {
    const currentTask = tasks.find(task => task.id === id);
    const newTitle = window.prompt("Edit task title:", currentTask.title);

    if (newTitle && newTitle !== currentTask.title) {
      const updatedTasks = tasks.map(task =>
        task.id === id ? { ...task, title: newTitle } : task
      );
      setTasks(updatedTasks);

      fetch(`https://task-traker-server.vercel.app/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          title: newTitle,
          completed: currentTask.completed,
        }),
      })
        .then(res => res.json())
        .then(data => console.log("Updated:", data))
        .catch(err => console.error("Update failed:", err));
    }
  };

  return (
    <div className="table-container">
      <h2 className="table-title">Task List</h2>
      <table className="task-table">
        <thead>
          <tr className="table-header-row">
            <th className="table-header">Task</th>
            <th className="table-header">Completed</th>
            <th className="table-header">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id} className={`table-row ${task.completed ? 'completed-task' : ''}`}>
              <td className="table-data task-title">{task.title}</td>
              <td className="table-data">
                <input
                  type="checkbox"
                  className="task-checkbox"
                  checked={task.completed}
                  onChange={() => handleChecked(task.id)}
                />
              </td>
              <td className="table-data task-actions">
                <button className="edit-btn" onClick={() => handleEdit(task.id)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(task.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayTable;