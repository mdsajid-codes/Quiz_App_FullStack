import { Request, Response } from "express";
import { getAllUsers } from "../models/userModels";

// Get all users 

export const getUsers = (req: Request, res: Response)=>{
    getAllUsers((err: any, users: any)=>{
        if(err) return res.status(500).json({error: "Failde to fetch users"});
        res.json({users})
    });
};

