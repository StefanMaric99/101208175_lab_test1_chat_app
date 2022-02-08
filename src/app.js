const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const { dbConnect } = require("./config/db.js");
const socket_server = require("./socket/server");
const http = require("http");

const app = express();
const PORT = process.env.PORT || 4000;

app.set("views", "src/views");
app.set("view engine", "ejs");

// socket.io
// const server = http.createServer(app);
// const socketio = require("socket.io");
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: '*' } });
socket_server.initiate(io);

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressLayouts)
app.use(express.static("src/public"));
app.use("/", require("./routes/index.js"));

// Mongo & Mongoose
// dbConnect()
//   .then(() => {
server.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:4000`);
});
// })
// .catch((err) => {
//   console.log("mongo db connection failed", err)
// });