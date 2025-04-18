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

// Configure Helmet with custom CSP
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "cdn.gpteng.co"],
        styleSrc: ["'self'", "'unsafe-inline'", "inferno-neon.vercel.app"],
        imgSrc: ["'self'", "data:", "lovable.dev", "inferno-neon.vercel.app"],
        connectSrc: ["'self'", "inferno-neon.vercel.app", "wss://ws-eu.pusher.com"],
        fontSrc: ["'self'"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'self'"],
      },
    },
  })
);

app.use(xss());
app.use(
  cors({
    origin: ["http://localhost:8080", "https://inferno-neon.vercel.app"],
    credentials: true,
  })
);

// API routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/broadcasts", broadcastRtouer);
app.use("/api/v1/broadcasts", messagesRouter);
app.use("/api/v1/websocket", websocketRouter);

// Serve static files
app.use(express.static(path.resolve(__dirname, "./client/dist"), {
  setHeaders: (res, path) => {
    // Set proper MIME types for CSS and JS files
    if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    } else if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    } else if (path.endsWith('.mjs')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
}));

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
