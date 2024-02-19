const express = require('express');
const  app = express();
const http = require('http');
const cors = require('cors')
app.use(cors());
app.use(express.json());

// const { Server } = require('socket.io')
// const server = http.createServer(app)

// const io = new Server(server,{
//     cors:{
//         origin: "https://chat-jdry098bf-shehryars-projects-01ac2e84.vercel.app/",
//         method:['GET',"POST"]
//     }
// })
// io.on("connection",(socket)=>{
//    console.log(`User Connect:${socket.id}`)

//    socket.on('join_room',(data) =>{
//     socket.join(data)
//   })
//   socket.on('send_message',(data) =>{
//     console.log("Message received on server:", data); // Add this line to log
//     socket.to(data.room).emit("received_message",data)
//   })
// });
app.use('/testing', (req, res)=>{
  res.send({data:"response is here"})
})

// server.listen('https://chat-app-gcdi.vercel.app/',()=>{
//     console.log(' Server is running')
// })