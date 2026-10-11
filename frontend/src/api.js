// All calls to the backend live here, so components stay simple.
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/tasks";

// Helper: send a request and return the JSON, or throw an Error with the server's message
async function request(url, options) {
  const res = await fetch(url, options);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Something went wrong");
  return data;
}

const jsonOptions = (method, body) => ({
  method,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body)
});

export const getTasks = () => request(API_URL);                                  // GET
export const addTask = (title) => request(API_URL, jsonOptions("POST", { title })); // POST
export const updateTask = (id, changes) =>
  request(`${API_URL}/${id}`, jsonOptions("PUT", changes));                      // PUT
export const deleteTask = (id) => request(`${API_URL}/${id}`, { method: "DELETE" }); // DELETE
