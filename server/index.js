const express = require('express');
const  app = express();
const http = require('http');
const cors = require('cors')
app.use(cors());
const { Server } = require('socket.io')
const server = http.createServer(app)
const io = new Server(server,{
    cors:{
        origin: "https://frontedchatapp.vercel.app/",
        method:['GET',"POST"]
    }
})
io.on("connection",(socket)=>{
   console.log(`User Connect:${socket.id}`)

   socket.on('join_room',(data) =>{
    socket.join(data)
  })
  socket.on('send_message',(data) =>{
    console.log("Message received on server:", data); 
    socket.to(data.room).emit("received_message",data)
  })
});
server.listen(3001,()=>{
    console.log(' Server is running')
})