

import { createServer } from "http";
import { join } from "path";
import { Server } from "socket.io";
import fs from "fs";



/**
 * Initializes a server and sets up a chat application.
 *
 * @param {type} paramName - description of parameter
 * @return {type} description of return value
 */
function StartWebApp() {
  const server = createServer();
  const io = new Server(server);


  io.on("connection", (socket) => {
    // Read chat history from the 'messages.txt' file
    fs.readFile("msgs.txt", "utf8", (err, data) => {
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