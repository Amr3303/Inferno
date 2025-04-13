require("dotenv").config();
require("express-async-errors");

const path = require("path");
// extra security packages
const helmet = require("helmet");
const xss = require("xss-clean");

const express = require("express");
const app = express();

// WebSocket support
const http = require("http");
const WebSocket = require("ws");

const connectDB = require("./db/connect");
const authenticateUser = require("./middleware/authentication");
// routers
const authRouter = require("./routes/auth");
const broadcastRtouer = require("./routes/broadcasts.routes");
const messagesRouter = require("./routes/messages.routes");
// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.set("trust proxy", 1);

app.use(express.static(path.resolve(__dirname, "./Frontend/build")));
app.use(express.json());
app.use(helmet());

app.use(xss());

// routes
app.get("/", (req, res) => {
  res.send("Hello ma man");
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/broadcasts", broadcastRtouer);
app.use("/api/v1/broadcasts", messagesRouter);

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "./Frontend/build", "index.html"));
// });

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

// Create HTTP server
const server = http.createServer(app);

// Create WebSocket server
const wss = new WebSocket.Server({ server });

// Store WebSocket server in app.locals for access in controllers
app.locals.wss = wss;

// WebSocket connection handling
wss.on("connection", (ws) => {
  console.log("Client connected");

  // Send a welcome message
  ws.send(
    JSON.stringify({
      type: "system",
      content: "Connected to Inferno Broadcasting System",
      timestamp: new Date(),
    })
  );

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

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
