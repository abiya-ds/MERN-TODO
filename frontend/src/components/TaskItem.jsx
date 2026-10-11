// One row: round checkbox (PUT), title (struck through when done), delete button (DELETE)
export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={task.completed ? "task done" : "task"}>
      <label className="check">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task)}
        />
        {/* custom checkbox drawn with CSS + a tick icon */}
        <span className="box" aria-hidden="true">
          <svg viewBox="0 0 16 16"><path d="M3.5 8.5l3 3 6-7" /></svg>
        </span>
        <span className="title">{task.title}</span>
      </label>
      <button
        className="delete"
        onClick={() => onDelete(task._id)}
        aria-label={`Delete ${task.title}`}
        title="Delete task"
      >
        <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" /></svg>
      </button>
    </li>
  );
}
