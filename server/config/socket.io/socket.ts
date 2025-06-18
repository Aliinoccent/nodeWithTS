import http from 'http'
import express, { Application } from 'express'
import { Server } from 'socket.io';
const app:Application= express();
const server=http.createServer(app);
const io =new Server(server,{
    cors:{
        origin:'http://localhost:5173/'
    }
});
io.on('connection',(socket)=>{
    console.log('user connected on id ',socket.id)
    socket.on('sendMessage',(data)=>{
        console.log(data);
    })
    

});

export {server,io,app}



