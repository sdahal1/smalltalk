const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors")

app.use(cors());

const server = app.listen(8000, () => 
    console.log(`the server is all fired up on port ${port}`)
)

const io = require("socket.io")(server)

io.on("connection", socket => {
    console.log("we in the io.on connection thang")
    console.log(socket.id);
    socket.on("thing", data => {
        console.log(data);
        io.emit("response", data)
    }) 
})