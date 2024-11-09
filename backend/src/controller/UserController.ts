import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { Request, Response } from "express";
import { User } from "../models/UserModel";

const generateToken = (id:Object) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: '30d',
  })
}
//    Signup new user
const signup = async (req: Request, res: Response) => {
  try {
    const {name, email, phone, password, admin } = req.body;
    // Check  user data
    if (!name || !email || !password || !phone ) {
      res.status(400)
      throw new Error('Please add all fields')
    }
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400)
      throw new Error('User already exists')
    }
    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    // Create user
    const newUser = new User({
      name, 
      email, 
      phone, 
      password: hashedPassword, 
      admin 
    });
    await newUser.save();

    res.status(201).json({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      token: generateToken(newUser._id),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error for signup user" });
  }
};
// User login
const login = async (req: Request, res: Response) => {
  const { email, password } = req.body
try {
  // Check for user email
  const user = await User.findOne({ email })
  // Check for user password
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      admin: user.admin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Error for login')
  }
} catch (error) {
  console.log(error);
  res.status(500).json({ message: "Error for login" });
  
}
  
}

export default {
  signup,
  login,
}