try {
    let socket = io(location.hostname + "/");

    socket.on("msgToClient", (data) => {
        console.log(data);
        let log = document.createElement("li");
        log.innerText = data;
        document.getElementById("serverLogs").appendChild(log);
    })

    socket.emit("request", "echo");
    alert(location.hostname + "/")
} catch (e) {
    alert(e)
}