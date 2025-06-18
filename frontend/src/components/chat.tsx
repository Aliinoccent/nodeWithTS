import React, { useState,useEffect } from 'react';
import { socket } from "./socket"

type Message = {
  id: number;
  sender: 'user';
  text: string;
};

const ChatUI: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: 'user', text: 'Hi there!' }
  ]);
  useEffect(()=>{
  socket.on('connect',()=>{
    console.log('connected ',socket.id);
  
  })
  
},[])
  const [input, setInput] = useState<string>('');

  const handleSend = () => {
    if (input.trim() === '') return;
    const newMessage: Message = {
      id: Date.now(),
      sender: 'user',
      text: input
    };
    setMessages(prev => [...prev, newMessage]);

    socket.emit('sendMessage',messages)
    setInput('');
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column' as const,
      height: '500px',
      width: '350px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      overflow: 'hidden',
      fontFamily: 'Arial, sans-serif'
    },
    header: {
      padding: '10px',
      backgroundColor: '#007bff',
      color: 'white',
      textAlign: 'center' as const,
      fontWeight: 'bold' as const
    },
    messages: {
      flex: 1,
      padding: '10px',
      overflowY: 'auto' as const,
      backgroundColor: '#f9f9f9'
    },
    message: {
      margin: '5px 0',
      maxWidth: '80%',
      padding: '8px 12px',
      borderRadius: '18px',
      alignSelf: 'flex-end' as const,
      backgroundColor: '#dcf8c6',
      overflowWrap: 'break-word' as const
    },
    inputContainer: {
      display: 'flex',
      padding: '10px',
      backgroundColor: '#eee'
    },
    input: {
      flex: 1,
      padding: '8px',
      borderRadius: '20px',
      border: '1px solid #ccc',
      outline: 'none'
    },
    button: {
      marginLeft: '10px',
      padding: '8px 16px',
      border: 'none',
      borderRadius: '20px',
      backgroundColor: '#007bff',
      color: 'white',
      cursor: 'pointer'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>Chat with Support</div>

      <div style={styles.messages}>
        {messages.map(msg => (
          <div key={msg.id} style={styles.message}>
            {msg.text}
          </div>
        ))}
      </div>

      <div style={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message..."
          style={styles.input}
        />
        <button onClick={handleSend} style={styles.button}>Send</button>
      </div>
    </div>
  );
};

export default ChatUI;
