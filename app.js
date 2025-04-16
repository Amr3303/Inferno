require("dotenv").config();
require("express-async-errors");

const path = require("path");
// extra security packages
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");

const express = require("express");
const app = express();

// WebSocket support
const http = require("http");
const websocketService = require("./services/websocket.service");

const connectDB = require("./db/connect");
const authenticateUser = require("./middleware/authentication");
// routers
const authRouter = require("./routes/auth");
const broadcastRtouer = require("./routes/broadcasts.routes");
const messagesRouter = require("./routes/messages.routes");
const websocketRouter = require("./routes/websocket.routes");
// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.set("trust proxy", 1);

// Move static file serving after routes
app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(
  cors({
    origin: ["http://localhost:8080", "http://localhost:8083", "https://inferno-neon.vercel.app"],
    credentials: true,
  })
);

// API routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/broadcasts", broadcastRtouer);
app.use("/api/v1/broadcasts", messagesRouter);
app.use("/api/v1/websocket", websocketRouter);

// Remove or comment out this route as it conflicts with the React app
// app.get("/", (req, res) => {
//   res.send("Hello ma man");
// });

// Serve static files
app.use(express.static(path.resolve(__dirname, "./client/dist")));

// Serve React app for all other routes
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});

// Error handling middleware should be last
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

// Create HTTP server
const server = http.createServer(app);

// Initialize WebSocket service
websocketService.initialize(server);

// Remove the existing WebSocket code
// wss.on("connection", (ws) => { ... });

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    server.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
