const clientMap = new Map();

function getChatter(id) {
    return clientMap.get(id);
}

function getChatters() {
    return clientMap;
}

function addClient(id, client) {
    clientMap.set(id, client);
}

function removeClient(id) {
    clientMap.delete(id);
}

class ChatterClient {
    constructor(id, host, port, socket) {
        this.id = id;
        this.host = host;
        this.port = port;
        this.socket = socket;
    }

    get getId() {
        return this.id;
    }

    get getHost() {
        return this.host;
    }

    get getPort() {
        return this.port;
    }

    get getSocket() {
        return this.socket;
    }
}

export default { addClient, removeClient, getChatter, getChatters, ChatterClient };