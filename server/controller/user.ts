import { Request, response, Response } from "express";
import { User, IUSER } from "../model/user";
import { config } from "dotenv";
import { generateToken } from "../utility/jwt";
import { hashing, verifyPassword } from "../utility/bcrypt";
config();

export const sginup = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;
    const { id, name }: { id: string; name: string } = req.body;
    console.log(id);

    console.log(name, email, password);
    const hashPas: string = await hashing(password);

    const newuser = new User({ name, email, password: hashPas });
    const token = await newuser.save();

    return res.status(200).json({ signup: "successfull" });
  } catch (error) {
    console.log(error);
    return res.json({ error });
  }
};
type signinInterface = Omit<IUSER, "name">;

export const signin = async (
  req: Request<{}, {}, signinInterface>,
  res: Response
): Promise<any> => {
  try {
    const { email, password } = req.body;
    const isUser: IUSER | null = await User.findOne({ email });
    if (!isUser) {
      return res.status(400).json({ messege: "user is not exist" });
    }
    console.log(isUser);
    const isVerify: boolean = await verifyPassword(isUser.password, password);
    if (isVerify === false) {
      return res.status(400).json({ messege: "passsword wrong" });
    }

    const token = generateToken(email);
    console.log(token);
    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};
