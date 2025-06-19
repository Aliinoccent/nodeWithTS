const express=require("express");
import { Router } from "express";
import {sginup,signin} from '../controller/user'
const router : Router=express.Router();
router.post('/',sginup);
router.post ('/login',signin);

export default router;