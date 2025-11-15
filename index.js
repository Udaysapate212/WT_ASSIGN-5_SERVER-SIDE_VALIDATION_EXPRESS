const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3000;
const userRouter = require("./routes/user.router");

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API routes (must come before static files)
app.use("/api/user", userRouter);

// Serve React app static files
app.use(express.static(path.join(__dirname, "public/dist")));

// Serve demo.html at /demo route
app.get("/demo", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "demo.html"));
});

// All other routes serve React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/dist", "index.html"));
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`✅ Server listening on http://localhost:${PORT}`);
    console.log(`🚀 React App: http://localhost:${PORT}`);
    console.log(`📝 Simple Demo: http://localhost:${PORT}/demo`);
    console.log(`📝 API Endpoint: http://localhost:${PORT}/api/user/register`);
  });
}

// Export for Vercel
module.exports = app;
