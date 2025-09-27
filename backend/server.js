import express from "express"
import http, { METHODS } from "http"
import { Server } from "socket.io"
import cors from "cors"

const app=express()
app.use(cors())

const server=http.createServer(app)
const io=new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"]  
    }
})

io.on("connection",(socket)=>{
    console.log("user connected",socket.id)

    socket.on("send_message",(data)=>{
        console.log("message:",data)
        
        io.emit("receive_message",data)
    })

    socket.on("disconnect",()=>{
        console.log("user disconnected",socket.id)
    })
})

server.listen(4000,()=>{
    console.log("server runing on port 4000...")
})