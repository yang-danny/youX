import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { Request, Response } from "express";
import { User } from "../models/UserModel";

// Generate token by provided secret key
const generateToken = (id:Object) => {
  return jwt.sign({ id }, process.env.SECRET_KEY!, {
    expiresIn: '30d',
  })
}
// Signup new user
const signup = async (req: Request, res: Response) => {
  try {
    const {name, email, phone, password, role } = req.body;
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
      role 
    });
    await newUser.save();

    res.status(201).json({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      role: newUser.role,
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
      role: user.role,
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
// Get all users
const getUsers= async (req:Request, res:Response): Promise<any> => {
  try {
    const allUsers = await User.find({})
    if(!allUsers){
      return res.status(404).json({ message: "Users not found" });
    }

    res.status(201).json(allUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error for getting all users" });
  }
}
// Get user details by user ID
const getUserDetails= async (req:Request, res:Response): Promise<any> => {
  try {
    const userDetails = await User.findById(req.params.id)
    if(!userDetails){
      return res.status(404).json({ message: "User not found" });
    }

    res.status(201).json(userDetails);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error for getting user details" });
  }
}
// Update user details by ID
const updateUser = async (req: Request, res: Response) => {
  try {
    const {name, email, phone, password, role } = req.body;
    // Check  user data
    if (!name || !email || !password || !phone || !role) {
      res.status(400)
      throw new Error('Please add all fields')
    }
    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const updateUser = await User.findByIdAndUpdate(req.params.id, {
      name, 
      email, 
      phone, 
      password: hashedPassword, 
      role 
    });
    res.status(201).json({updateUser});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error for signup user" });
  }
}
// Delete user by ID
const deleteUser= async (req:Request, res:Response): Promise<any> => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id)
    if(!deleteUser){
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(204).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error for deleting user details" });
  }
}
export default {
  signup,
  login,
  getUsers,
  getUserDetails,
  updateUser,
  deleteUser,
}