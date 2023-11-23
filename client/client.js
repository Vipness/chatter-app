import { io } from 'socket.io-client';
import readline from 'readline';

let msgSent = true;
let isConnected = false;
const socket = io("http://<iphere>:3400/");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
socket.connect();

socket.on("serverMessage", (data) => {
    msgSent = true;
    console.log(data);
});

socket.on("connect", () => {
    console.log("Successfully connected to the server!\n");
    isConnected = true;
    sendMessage();
});

socket.on("disconnect", () => {
    isConnected = false;
    rl.close();
})

async function sendMessage() {
    if (!msgSent) {
        sendMessage();
        return;
    }

    if (!isConnected) {
        console.log("Not connected to the server.");
        rl.close();
        return;
    }

    rl.question("you: \n", (text) => {
        socket.emit("clientMessage", text);
        msgSent = false;
        
        setTimeout(() => {
            sendMessage();
        }, 20);
    });
}