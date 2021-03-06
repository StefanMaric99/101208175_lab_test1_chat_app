const { Message } = require("../schema");

module.exports = {
  initiate: (io) => {
    // Run when client connects
    io.on("connection", (socket) => {
      // console.log({ socket: socket.id }, "user connected")

      socket.on("message", async (msg) => {
        const { username, roomname } = socket;
        const message = new Message({
          from_user: username,
          to_user: `everyone in the group of ${roomname}`,
          message: msg,
          date_sent: new Date().toTimeString(),
          room: roomname
        });

        message.save()
          .then(result => console.log(result))
          .catch(err => console.log(err))

        // work around for seperating room system
        socket.broadcast.emit("message", { msg, roomname });
      })

      socket.on("joinChat", async ({ username, roomname }) => {
        // console.log({ username, roomname })

        // TODO take it out, if it does not need it
        socket.join(username);
        socket.username = username;
        socket.roomname = roomname;

        // // Welcome current user
        // socket.emit("message", { msg: "Hi", user: "Server" });

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
        // console.log(data);
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
        const { username, roomname } = socket;
        socket.broadcast.emit("typing", { username, roomname })
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
