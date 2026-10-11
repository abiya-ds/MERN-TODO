MERN To-Do List

A full-stack To-Do List built with MongoDB, Express, React and Node.js. Tasks are saved in MongoDB through a REST API, so they survive a page refresh.

Features
Add, complete/uncomplete, and delete tasks
Data stored in MongoDB (Mongoose model: title, completed, createdAt)
Input validation (empty titles rejected with 400), proper status codes (201, 400, 404)
CORS restricted to the frontend's address
Project structure
backend/    Express server, Mongoose model, routes
frontend/   React app (Vite): TaskForm, TaskList, TaskItem
screenshots/
Prerequisites
Node.js 18 or newer
MongoDB running locally, or a free MongoDB Atlas cluster

Run the backend
bash
cd backend
npm install
cp .env.example .env      # then edit .env (Windows: copy .env.example .env)
npm start                 # http://localhost:5000

Environment variables (backend/.env):

Variable	Meaning	Example
MONGO_URI	MongoDB connection string	mongodb://127.0.0.1:27017/todo
PORT	Port for the API (optional)	5000
CLIENT_ORIGIN	Frontend address allowed by CORS	http://localhost:3000

Run the frontend

In a second terminal:

bash
cd frontend
npm install
npm start                 # http://localhost:3000

Optional: copy frontend/.env.example to frontend/.env if your API is not at http://localhost:5000/api/tasks.

API
Method	Endpoint	Description	Success
GET	/api/tasks	List all tasks	200
POST	/api/tasks	Create a task { "title": "..." }	201
PUT	/api/tasks/:id	Update title and/or completed	200
DELETE	/api/tasks/:id	Delete a task	200

Errors: 400 for an empty title, 404 if the task is not found.

Screenshots

Add your screenshots to the screenshots/ folder and list them here:

screenshots/add-task.png
screenshots/complete-task.png
screenshots/delete-task.png
screenshots/pull-requests.png
Git workflow

Backend built on feature/backend, frontend on feature/frontend, both merged into main with pull requests.
