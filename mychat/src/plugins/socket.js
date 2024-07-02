import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

const socketServer = {
  // 加入房间
  joinRoom: (eventName, roomId) => {
    socket.emit(eventName, roomId);
  },
  //   发送私聊消息
  sendPrivateMessage: (eventName, message) => {
    socket.emit(eventName, message);
  },
  // 监听消息
  on: (eventName, callback) => {
    socket.on(eventName, (data) => {
      return callback(data);
    });
  },
  //   断开连接
  disconnect: () => {
    socket.disconnect();
  },
};

export default socketServer;
