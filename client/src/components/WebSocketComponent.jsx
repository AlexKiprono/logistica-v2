import { useEffect } from 'react';
import io from 'socket.io-client';

const WebSocketComponent = () => {
  useEffect(() => {
    const socket = io('http://127.0.0.1:5000');

    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });

    socket.on('message', (message) => {
      console.log('Received message: ', message);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      {/* <h1>WebSocket Component</h1> */}
    </div>
  );
};

export default WebSocketComponent;
