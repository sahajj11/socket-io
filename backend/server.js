import express from "express"
import http, { METHODS } from "http"
import { Server } from "http"
import cors from "cors"

const app=express()
app.use(cors())

const server=http.createServer(app)
const io=new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        METHODS:["GET","POST"]  
    }
})


app.listen(4000,()=>{
    console.log("server runing on port 4000...")
})