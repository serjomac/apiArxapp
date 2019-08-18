module.exports = function(server){
var socket_io = require('socket.io');
var io = socket_io(server);
const socketAPI = {};
io.on('connection', (socket) => {
  console.log('user connected');
  console.log(socket.id);
  socket.on("wating",(data)=>{
    console.log(data)
  });
  
//io.emit("result","todo bien");
});
socketAPI.sendRes= function(data,socket){
  console.log("enviando data")
  io.emit("result", data)
}
socketAPI.sendEstaMesa= function(data,socket){
  console.log("enviando data")
  io.emit("estadoMesa", data)
}
socketAPI.sendFacturaCreada= function(data,socket){
  console.log("enviando data")
  io.emit("factura", data)
}
socketAPI.io=io
let soc=0
console.log("socket")

// socketAPI.conecciones=connections;
return socketAPI;
}
