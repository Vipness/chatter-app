import { io } from 'socket.io-client';

const socket = io("http://127.0.0.1:3400/");
socket.connect();

socket.emit("clientMessage", "test");

socket.on("serverMessage", (data) => {
    console.log(data);
});