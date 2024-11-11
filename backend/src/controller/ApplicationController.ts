import { Request, Response } from "express";
import { Application } from "../models/ApplicationModel";

  // Create new application
  const create = async (req: Request, res: Response) => {
    try {
      const {user,  type, provider, amount, income, expenses, assets, liabilities, description, status} = req.body;
      // Check  application data
      if (!user || !type || !provider || !amount || !income|| !expenses|| !assets || !liabilities) {
        res.status(400)
        throw new Error('Please add all fields')
      }

      // Create application
      const newApplication = new Application({
        user, type, provider, amount, income, expenses, assets, liabilities, description, status
      });
      await newApplication.save();
  
      res.status(201).json({
        _id: newApplication.id,
        user: newApplication.user,
        // name: newApplication.name,
        type: newApplication.type,
        provider: newApplication.provider,
        amount: newApplication.amount,
        income: newApplication.income,
        expenses: newApplication.expenses,
        assets: newApplication.assets,
        liabilities: newApplication.liabilities,
        description: newApplication.description,
        status: newApplication.status,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error for creating new application" });
    }
  };
  // Get all applications for admin
  const getAllApplications = async (req: Request, res: Response): Promise<any> => {
    try {
 
      // Create application
      const allApplications = await Application.find({}).populate('user');
      if(!allApplications){
        return res.status(404).json({ message: "Applications not found" });
      }
  
      res.status(201).json(allApplications);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error for getting all applications" });
    }
  };
  // Get user's applications by user ID
  const getUserApplications = async (req: Request, res: Response): Promise<any> => {
    try {
      const userApplications = await Application.find({user:req.params.id}).populate('user');
      if(!userApplications){
        return res.status(404).json({ message: "Applications not found" });
      }
  
      res.status(201).json(userApplications);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error for getting user applications" });
    }
  };
  // Get user's application details by application ID
  const getApplicationDetails = async (req: Request, res: Response): Promise<any> => {
    try {
 
      // Create application
      const applicationDetails = await Application.findById(req.params.id).populate('user');
      if(!applicationDetails){
        return res.status(404).json({ message: "Applications not found" });
      }
  
      res.status(200).json(applicationDetails);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error for getting application details" });
    }
  };
  // Delete application by ID 
  const deleteApplication = async (req: Request, res: Response): Promise<any> => {
    try {

      const deleteApplication = await Application.findByIdAndDelete(req.params.id);
      if(!deleteApplication){
        return res.status(404).json({ message: "Applications not found" });
      }
      return res.status(204).json({ message: "Applications deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error for deleting application" });
    }
  };
  // Update application details by ID
  const updateApplicationDetails = async (req: Request, res: Response) => {
    try {

      const {user,  type, provider, amount, income, expenses, assets, liabilities, description, status} = req.body;
      // Check  application data
      if (!user || !type || !provider || !amount || !income|| !expenses|| !assets || !liabilities) {
        res.status(400)
        throw new Error('Please add all fields')
      }

      // Update application
      const updateApplication = await Application.findByIdAndUpdate(req.params.id, req.body);
  
      res.status(200).json({
        updateApplication
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error for creating new application" });
    }
  };

  export default {
    create,
    getAllApplications,
    getUserApplications,
    deleteApplication,
    getApplicationDetails,
    updateApplicationDetails,
  }