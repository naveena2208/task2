const http = require("http");
const server = require("socket.io");

const httpServer = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
});
httpServer
  .once("error", (err) => {
    console.error(err);
    process.exit(1);
  })
  .listen(8001, () => {
    console.log("socket io started on PORT 8001");
  });

const io = new server.Server(httpServer, {});
io.on("connection", (socket) => {
  console.log("connection called");
  socket.on("message", (msg) => {
    console.log("message emitted");
    io.emit("message", msg);
  });
});

module.exports = { io };
