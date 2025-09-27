import { useEffect, useState } from "react";
import { io } from "socket.io-client"; 

const socket = io("http://localhost:4000"); 

export default function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    console.log(" Listening for messages...");

    socket.on("receive_message", (data) => {
      console.log(" Message received:", data); 
      setChat((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  useEffect(() => {
  console.log(" Chat state:", chat);
}, [chat]);

  const sendMessage = () => {
    if (message.trim() === "") return;
    console.log(" Sending message:", message); 
    socket.emit("send_message", message);
    setMessage("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2> Simple Chat App</h2>
      <div >
        {chat.map((msg, idx) => (
          <p key={idx}>{msg}</p>
        ))}
      </div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
