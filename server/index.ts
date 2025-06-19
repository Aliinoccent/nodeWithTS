import dotenv from 'dotenv'
import {server,app} from './config/socket.io/socket'
import express from 'express'
import cors from 'cors'
import db from './config/db/database';
import auth from './router/auth';

app.use(express.json());
app.use(cors({
    origin:'http://localhost:5173/',
    credentials:true
}))
dotenv.config();
const port:number =Number( process.env.PORT) || 5001;
console.log(port);
app.use('/user',auth);
db();
server.listen(port,()=>{
    console.log("app listen on port :",port)
})

