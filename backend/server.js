// Entry point of the backend: sets up Express, CORS, MongoDB and routes.
require("dotenv").config(); // load variables from .env into process.env

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const taskRoutes = require("./routes/tasks");

const app = express();
const PORT = process.env.PORT || 5000;

// A6: allow requests only from the frontend's address (not every origin)
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:3000" }));

// A1: parse JSON request bodies
app.use(express.json());

// All task routes live under /api/tasks
app.use("/api/tasks", taskRoutes);

// A2: connect to MongoDB using the connection string from .env, then start the server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });
