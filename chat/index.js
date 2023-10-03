/**
 * Initializes an express server, sets up routes and event handlers for socket.io, and starts the server listening on port 3000.
 *
 * @return {undefined} No return value.
 */
function index_js() {
  const express = require("express");
  const { createServer } = require("http");
  const { join } = require("path");
  const { Server } = require("socket.io");
  const fs = require("fs");

  const app = express();
  const server = createServer(app);
  const io = new Server(server);

  app.get("/", (req, res) => {
    res.sendFile(join(__dirname, "index.html"));
  });

  io.on("connection", (socket) => {
    // Read chat history from the 'messages.txt' file
    fs.readFile("messages.txt", "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      // Split the content into an array of messages
      const messages = data.split("\n");

      // Send each message to the connected user
      messages.forEach((msg) => {
        if (msg.trim() !== "") {
          socket.emit("chat message", msg);
        }
      });
    });

    socket.on("chat message", (msg) => {
      io.emit("chat message", msg);

      // Append the new message to the 'messages.txt' file
      fs.appendFile("messages.txt", msg + "\n", (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
    });
  });

  server.listen(3000, () => {
    console.log("server running at http://localhost:3000");
  });
}