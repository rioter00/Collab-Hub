const
    io = require("socket.io-client"),
    // ioClient = io.connect("http://localhost:3000");
		ioClient = io.connect("remote-collab.herokuapp:45095");

ioClient.on("seq-num", (msg) => console.info(msg));
ioClient.on('connect', () => {
	ioClient.emit('addUsername', 'Carl');
	console.log("connected");
})
