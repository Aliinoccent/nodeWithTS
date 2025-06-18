
import mongoose from 'mongoose';
interface IUSER extends mongoose.Document{
    name:string;
    email:string;
    password:string;
    role:string
}
const UserSchema:any= new mongoose.Schema<IUSER>({
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
        require:true

    },
    password:{
        type:String,
        require :true,
    },
    role:{
        type:String,
        enum:["admin","user"],
        default:"user"
    }
})
const User=mongoose.model<IUSER>('User',UserSchema);
export {User,IUSER}; 