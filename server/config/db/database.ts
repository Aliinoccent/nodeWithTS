import mongoose from 'mongoose'

import {config} from 'dotenv';
config();
const db=async()=>{
    try {
     await mongoose.connect(process.env.CONNECTIONSTRING as string);
     console.log('db connected');
    } catch (error) {
        console.log(error)
    }
}
export default db;