import { Server } from 'socket.io';
import http from 'http';
import clientController from './controller/clientController.js'

const server = http.createServer();
const io = new Server(server);
const host = "0.0.0.0";
const port = 3400;

server.listen(port, host, () => {
    console.log(`[Server] Listening on ${host}:${port}`);
});

io.on("connection", (socket) => {
    console.log(socket.data);
    const id = socket.id;
    const clientHost = socket.client.conn.remoteAddress;
    const clientPort = 2345;
    console.log(`[RC/J] Connected ${clientHost}:${clientPort}`);

    clientController.addClient(
        id,
        new clientController.ChatterClient(id, clientHost, clientPort, socket)
    );

    socket.on("disconnect", (socket2) => {
        const chatter = clientController.getChatter(id);
        const clientHost = chatter.host;
        const clientPort = chatter.port;
        console.log(`[RC/Q] Disconnected ${clientHost}:${clientPort}/${id}`);
    });

    socket.on("clientMessage", (data) => {
        const chatter = clientController.getChatter(id);
        const clientHost = chatter.host;
        const clientPort = chatter.port;

        console.log(`[C/MSG] ${clientHost}:${clientPort} > ${data}`)

        for (let chatterClient of clientController.getChatters().values()) {
            chatterClient.socket.emit("serverMessage", `${clientHost}:${clientPort} > ${data}`);
        }
    });
});

