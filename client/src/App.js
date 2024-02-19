import "./App.css";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

function App() {
  const [message, setMessage] = useState("");
  const [messagesReceived, setMessagesReceived] = useState([]); 
  const [sentMessages, setSentMessages] = useState([]); // State for sent messages

  const [room, setRoom] = useState("");
    const [hasJoinedRoom, setHasJoinedRoom] = useState(false); 
  const JoinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
      setMessagesReceived([]); 
      setHasJoinedRoom(true);
      setSentMessages([]); // Clear sent messages

    }
  };

  const SentMessage = () => {
    if (message !== "") {
      const messageData = { message, room, userId: socket.id, timestamp: new Date().toISOString() }; // Include userId
      socket.emit("send_message", messageData );
      console.log("Sending message:", messageData);
      setMessage("");
      setSentMessages(prevMessages => [...prevMessages, messageData]); // Add to sent messages

    }

  };

  useEffect(() => {
    const messageListener = (data) => {
      console.log("Message received:", data);

      if (data.room === room) {
        setMessagesReceived((prevMessages) => [...prevMessages, data]);
      }
    };

    socket.on("received_message", messageListener);

    return () => {
      socket.off("received_message", messageListener);
    };
  }, [room]);
  const messagesForDisplay = [...sentMessages, ...messagesReceived].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  return (
    <div className="App">
      <div className='header'>
    <p>Chat App</p>
      </div>
       <h1 className="roomnumber">Room#{room}</h1>

      {!hasJoinedRoom ? (
        // If the user hasn't joined a room, show the join room interface
        <div className="roomContainer">
          <input autoComplete="off" placeholder='Room Number...' onChange={(event) => { setRoom(event.target.value.replace(/\D/,'')) }} value={room} />
          <button onClick={JoinRoom}>Join Room</button>
        </div>
      ) : (
        // If the user has joined a room, show the chat interface
        <div className="ChatContainer">
          <div className="chat">
          <div className="UserChat">
          {messagesForDisplay.map((msg, index) => (
                <div key={index}        style={{ 
                  // color: msg.userId === socket.id ? "blue" : "white",
                  maxWidth: "60%", 
                  // maxheight: "60%", 
                  padding: "5px 10px", 
                  borderRadius: "10px", 
                  margin: "5px", 
                  wordWrap: "break-word", 
                  float: msg.userId === socket.id ? "right" : "left", 
                  clear: "both" ,
                  minWidth:"30px",
                  background: msg.userId === socket.id ? "#479856" : "rgb(75 74 172)"
                }} 
          className="message">
          {msg.message}
                </div>
              ))}
                   </div>
        <input autoComplete="off"  placeholder='Message...' onChange={(event) => { setMessage(event.target.value) }} value={message} />
          <button onClick={SentMessage}>Send Message</button>
        </div>
        </div>
      )}
    
    </div>
  );
}

export default App;