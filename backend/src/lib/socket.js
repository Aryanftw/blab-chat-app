import {Server} from "socket.io"
import express from "express"
import http from "http"

const app = express()

const server = http.createServer(app)

const userSocketMap = {

}

const io = new Server(server,{
  cors : {
    origin:"http://localhost:5173",
  },
})

export function getRecieverSocketId (userId) {
  return userSocketMap[userId]
}

io.on("connection" , (socket) => {
    console.log("A user connected ",socket.id)
    const userId = socket.handshake.query.userId
    io.emit("getOnlineUsers",Object.keys(userSocketMap))
    if(userId) userSocketMap[userId] = socket.id
    socket.on("disconnect", () => {
        console.log("A user disconnected ",socket.id)
        delete userSocketMap[userId]
        io.emit("getOnlineUsers",Object.keys(userSocketMap))
    })
})

export {io,app,server}