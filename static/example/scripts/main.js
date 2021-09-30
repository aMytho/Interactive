let accessToken = "";
let socket;
let authInfo = {
    transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: "Bearer " + accessToken, //'Bearer h93t4293t49jt34j9rferek...'
          }
        }
      }
}

function connect() {
    socket = io("/", authInfo);
    socket.on("msgToClient", (data) => {
        console.log(data);
        let log = document.createElement("li");
        log.innerText = data;
        document.getElementById("serverLogs").appendChild(log);
    })
    socket.on("error", (data) => {
        console.log(data);
        alert(JSON.parse(data).toString())
        let log = document.createElement("li");
        log.innerText = JSON.parse(data);
        document.getElementById("serverLogs").appendChild(log);
    })
}



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

function authRequest() {
    socket.emit("auth", {lol: true})
}

async function auth() {
    console.log("AUthing");
    let request = await fetch("/auth/guest");
    let response = await request.json();
    alert("token is => " + response.access_token);
    accessToken = response.accessToken;
    connect();
}

function causeError() {
    socket.emit("errorl", 5);
}