import { Request, response, Response } from "express";
import { User, IUSER } from "../model/user";
import { config } from "dotenv";
import { generateToken } from "../utility/jwt";
config();

export const sginup = async (req: Request<{}, {}, IUSER>, res: Response):Promise<any>=> {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    const newuser = new User({ name, email, password });
    const token = await newuser.save();

    return res.status(200).json({ signup: "successfull" });
  } catch (error) {
    console.log(error);
   return res.json({ error });
  }
};
type signinInterface = Omit<IUSER, "name">;

export const signin = async (req: Request<{}, {},signinInterface>,res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;
    const isUser = await User.findOne({ email });
    if (!isUser) {
      return res.status(400).json({ messege: "user is not exist" });
    }
    console.log(isUser);

    const token = generateToken(email);
    console.log(token);
    return res.status(200).json({ token });
  } catch (error) {console.log (error);
    return res.status(500).json({error})
  }
};
