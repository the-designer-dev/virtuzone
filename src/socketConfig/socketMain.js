import socketIOClient from 'socket.io-client';

export const socket = socketIOClient(process.env.NEXT_PUBLIC_BASE_URL, {
  extraHeaders: {
    role: 'admin'
  }
});

socket.connect();
