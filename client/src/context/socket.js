import { io } from "socket.io-client";
import React from "react";

export const socket = io.connect('http://localhost:8080/posts', {
    rejectUnauthorized: false,
    transports: ['websocket', 'polling', 'flashsocket']
  });
export const SocketContext = React.createContext();