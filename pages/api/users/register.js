import User from "@/models/User";
import dbConnect from "../../../util/dbConnect";
import bcrypt from "bcryptjs";

const handler = async (req, res) => {
  await dbConnect();
  const body = req.body;
  const user = await User.findOne({ email: body.email });
  if (user) {
    res.status(400).json({ message: "User already exists" });
    return;
  }

  try {
    const newUSer = await User(body);
    // generate salt to has password
    const salt = await bcrypt.genSalt(10);
    //create hash
    newUSer.password = await bcrypt.hash(newUSer.password, salt);
    newUSer.confirmPassword = await bcrypt.hash(newUSer.confirmPassword, salt);
    await newUSer.save();
    res.status(200).json(newUSer);
    //set password to hash
  } catch (error) {
    console.log(error);
  }
};

export default handler;
