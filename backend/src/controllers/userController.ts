import { Request, Response } from "express";
import { createLogin, getAllUsers } from "../models/userModels";

// Get all users 

export const getUsers = (req: Request, res: Response)=>{
    getAllUsers((err: any, users: any)=>{
        if(err) return res.status(500).json({error: "Failde to fetch users"});
        res.json({users})
    });
};

// adding Users

export const addUser = (req: Request, res: Response)=>{
    createLogin(req.body, (err: any, newUser: any)=>{
        if(err) return res.status(500).json({error: "Failed to add User"});
        res.json({message: "User added Succesfully!", quiz: newUser})
    })
}

