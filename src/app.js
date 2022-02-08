const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require('express-session');

const { dbConnect } = require("./config/db.js");
const socket_server = require("./socket/server");
const http = require("http");

const app = express();
const PORT = process.env.PORT || 4000;

app.set("views", "src/views");
app.set("view engine", "ejs");

// socket.io
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: '*' } });
socket_server.initiate(io);

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressLayouts)
app.use(express.static("src/public"));
const sessionConfig = {
  secret: 'secret key for cookie',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 2,
    sameSite: true,
    // secure: process.env.NODE_ENV === "production",
    secure: false,
    saveUninitialized: false,
  }
}
app.use(session(sessionConfig));
app.use(function (req, res, next) { // to have access to all session stored variables in ejs
  res.locals.session = req.session;
  next();
});

app.use("/", require("./routes/index.js"));

// Mongo & Mongoose
dbConnect()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("mongo db connection failed", err)
  });