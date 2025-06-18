const express=require("express");
import { Application } from "express";
import {sginup,signin} from '../controller/user'
const app : Application=express();
app.post('/',sginup);
app.post ('/login',signin);

export default app;