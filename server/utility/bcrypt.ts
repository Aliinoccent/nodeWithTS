import bcrypt from "bcrypt";
const saltRound: number = 10;
export const hashing = async (data: string): Promise<string> => {
  try {
    let hash: string = await bcrypt.hash(data, saltRound);
    return hash;
  } catch (error) {
    console.log(error);
    return "error";
  }
};

export const verifyPassword = async (hashPassword: string,plainPassword:string): Promise<boolean> => {
  try {
    const isVarify = await bcrypt.compare( plainPassword,hashPassword);
    return isVarify;
  } catch (error) {
    console.log(error);
    return false
  }
};
