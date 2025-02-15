import { Request, Response } from "express";
import { createQuiz, deleteQuiz, getAllDatas, getQuizById, updateQuiz } from "../models/quizModels";


// Get all data of quiz

export const getDatas = (req: Request, res: Response)=>{
    getAllDatas((err: any, datas: any)=>{
        if(err) return res.status(500).json({error: "Failed to Fetch quiz data"});
        res.json({datas});
    })
}

// get Quiz by id

export const getData = (req: Request, res: Response)=>{
    const id = parseInt(req.params.id);
    getQuizById(id, (err: any, quiz: any)=>{
        if (err || !quiz) return res.status(404).json({ error: "User not found" });
        res.json({ quiz });
    })
}

// Crete quize

export const addQuiz = (req: Request, res: Response)=>{
    createQuiz(req.body, (err: any, newQuiz: any)=>{
        if(err) return res.status(500).json({error: "Failed to add Quiz"});
        res.json({message: "Quiz added Succesfully!", quiz: newQuiz})
    })
}

// Update quizes

export const editQuiz = (req: Request, res: Response)=>{
    const id = parseInt(req.params.id);
    updateQuiz(id, req.body, (err:any)=>{
        if (err) return res.status(500).json({ error: "Failed to update user" });
        res.json({ message: " User updated successfully!" });
    })
}

// Delete Quize

export const removeQuiz = (req: Request, res: Response)=>{
    const id = parseInt(req.params.id);
    deleteQuiz(id, (err: any)=>{
        if (err) return res.status(500).json({ error: "Failed to delete user" });
        res.json({ message: " User deleted successfully!" });
    })
}