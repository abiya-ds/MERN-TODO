import { useEffect, useState } from "react";
import { getTasks, addTask, updateTask, deleteTask } from "./api";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const FILTERS = [
  ["all", "All"],
  ["active", "To do"],
  ["done", "Done"]
];

export default function App() {
  const [tasks, setTasks] = useState([]);   // B2: tasks live in component state
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // which tasks to show (UI only)

  // B2: fetch all tasks once, when the page first loads
  useEffect(() => {
    getTasks()
      .then(setTasks)
      .catch(() => setError("Could not load tasks. Is the backend running?"))
      .finally(() => setLoading(false));
  }, []);

  // B3: send the new task to the server, then add the saved task to the list
  async function handleAdd(title) {
    try {
      const created = await addTask(title);
      setTasks((prev) => [created, ...prev]);
      setError("");
      return true; // tells the form it can clear the input
    } catch (err) {
      setError(err.message);
      return false;
    }
  }

  // B4: toggle completed through PUT, then swap the updated task into state
  async function handleToggle(task) {
    try {
      const updated = await updateTask(task._id, { completed: !task.completed });
      setTasks((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
      setError("");
    } catch (err) {
      setError(err.message);
    }
  }

  // B5: delete through DELETE, then remove the task from state
  async function handleDelete(id) {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
      setError("");
    } catch (err) {
      setError(err.message);
    }
  }

  // Numbers for the heading and progress bar
  const done = tasks.filter((t) => t.completed).length;
  const remaining = tasks.length - done;
  const percent = tasks.length ? Math.round((done / tasks.length) * 100) : 0;

  // Apply the selected filter
  const visible = tasks.filter((t) =>
    filter === "active" ? !t.completed : filter === "done" ? t.completed : true
  );

  let summary = `${remaining} left to do`;
  if (loading) summary = "Loading…";
  else if (tasks.length === 0) summary = "Nothing planned yet";
  else if (remaining === 0) summary = "Everything is done";

  return (
    <main className="app">
      <header className="head">
        <h1>My tasks</h1>
        <p className="count">{summary}</p>
      </header>

      <div
        className="progress"
        role="progressbar"
        aria-label="Tasks completed"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={percent}
      >
        <span style={{ width: `${percent}%` }} />
      </div>

      <TaskForm onAdd={handleAdd} />
      {error && <p className="error" role="alert">{error}</p>}

      <div className="filters" role="group" aria-label="Filter tasks">
        {FILTERS.map(([key, label]) => (
          <button
            key={key}
            className={filter === key ? "on" : ""}
            aria-pressed={filter === key}
            onClick={() => setFilter(key)}
          >
            {label}
          </button>
        ))}
      </div>

      {!loading && tasks.length === 0 && !error && (
        <p className="empty">Type a task above and choose Add task to get started.</p>
      )}
      {tasks.length > 0 && visible.length === 0 && (
        <p className="empty">No tasks in this view.</p>
      )}

      <TaskList tasks={visible} onToggle={handleToggle} onDelete={handleDelete} />
    </main>
  );
}
