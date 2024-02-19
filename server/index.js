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
const corsOptions = {
  origin: "https://frontedchatapp.vercel.app",
  methods: ["GET", "POST"]
};

app.use(cors(corsOptions));

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
const port = process.env.PORT || 3001;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
