import { Request, Response } from "express";
import { User, IUSER } from "../model/user";
import { config } from "dotenv";
import { generateToken } from "../utility/jwt";
config();

export const sginup = async (req: Request<{}, {}, IUSER>, res: Response) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    const newuser = new User({ name, email, password });
    const token = await newuser.save();

    res.status(200).json({ signup: "successfull" });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
};
type signinInterface = Omit<IUSER, "name">;

export const signin = async (
  req: Request<{}, {}, signinInterface>,
  res: Response
) => {
  try {
    const { email, password } = req.body;
    const isUser: Object | undefined|null = await User.findOne({ email });
    if (!isUser) {
      return res.status(400).json({ messege: "user is not exist" });
    }
    console.log(isUser);

    const token = generateToken(email);
    console.log(token);
    res.status(200).json({ token });
  } catch (error) {console.log (error);
    res.status(500).json(error)
  }
};
