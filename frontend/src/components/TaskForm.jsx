import { useState } from "react";

// Form for adding a task. The parent decides what "add" does (calls the API).
export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();              // stop the browser reloading the page
    if (!title.trim()) return;       // ignore empty input
    const ok = await onAdd(title);
    if (ok) setTitle("");            // clear the input only if the add worked
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs doing?"
        aria-label="New task"
      />
      <button type="submit">Add task</button>
    </form>
  );
}
