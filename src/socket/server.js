module.exports = {
  initiate: (io) => {
    // Run when client connects
    io.on("connection", (socket) => {
      console.log({ socket: socket.id }, "user connected")
      socket.on("message", async (data) => {
        socket.broadcast.emit("message", data)
      })


      socket.on("joinChat", async ({ username, roomname }) => {
        console.log({ username, roomname })
        // socket.join(user.room);
        socket.username = username;
        // socket.username = user.username
        // // // Welcome current user
        // // socket.emit("message", { msg: "Hi", user: "Server" });

        // // Broadcast when a user connects
        // socket.broadcast.to(user.room).emit("message", {
        //   msg: `${user.username} has joined &#127881;`,
        //   user: "Server",
        // });

        // // Send a list of users and room info
        // io.to(user.room).emit("roomUsers", {
        //   room: user.room,
        //   users: utils.getRoomUsers(user.room),
        //   prevMsg: ["test", "test2"]
        // });
      });

      socket.on("typing", (data) => {
        console.log(data);
        socket.broadcast.emit("typing", { username: socket.username })
      })

      // Receive messages from a client
      socket.on("chatMessage", (msg) => {
        console.log({ msg })
        // const user = utils.getCurrentUser(socket.id);
        // io.to(user.room).emit("message", {
        //   msg: msg,
        //   user: user.username,
        //   userIcon: user.userIcon,
        // });

        // restaurantService.saveMsg({user: user.username, msg, room: user.room});
      });

      socket.on("typing", () => {
        socket.broadcast.emit("typing", { user: socket.username })
      })

      // Runs when client disconnects
      socket.on("disconnect", () => {
        console.log("Client disconnected");

        // const user = utils.userLeave(socket.id);

        // if (user) {
        //   io.to(user.room).emit("message", {
        //     msg: `${user.username} has left this chat room &#x1F625;`,
        //     user: "Server",
        //   });

        //   // Send users and room info
        //   io.to(user.room).emit("roomUsers", {
        //     room: user.room,
        //     users: utils.getRoomUsers(user.room),
        //   });
        // }
      });
    });
  },
};
