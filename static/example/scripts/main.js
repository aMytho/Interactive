let socket = io();

socket.on("msgToClient", (data) => {
    console.log(data);
    let log = document.createElement("li");
    log.innerText = data;
    document.getElementById("serverLogs").appendChild(log);
})

function makeRequest() {
    socket.emit("request", "echo");
}

function joinRoom() {
    socket.emit("createSession", "joining a session")
}

function getRandomMessage() {
    socket.emit("random", 5)
}

function roomMSG() {
    socket.emit("room", 5000)
}

function pipe() {
    socket.emit("findAllSession", {session: "test", user: "mytho", breed: "five", other: "string"})
}