import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();
export const  generateToken=(payload:string):string=>{

   return jwt.sign(payload,process.env.SECERATKEY as string)
}
