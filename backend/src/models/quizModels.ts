import db from '../config/db';


export interface Quiz {
    id?: number;
    title: string;
    description: string;
    teacher_id: number;
}

// Getting all data from quizess

export const getAllDatas = (callback: Function)=>{
    db.query("SELECT * FROM quizzes", (err, results)=>{
        if(err) return callback(err, null);
        callback(null, results);
    });
};

// Get Quiz by id

export const getQuizById = (id: number, callback: Function)=>{
    db.query("SELECT * FROM quizzes WHERE id = ?", [id], (err, results)=>{
        if(err) return callback(err, null);
        callback(null, results);
    })
}

// Create Quiz

export const createQuiz = (quiz: Quiz, callback: Function)=>{
    const {title, description, teacher_id} = quiz;
    db.query("INSERT INTO quizzes(title, description, teacher_id) VALUES(?,?,?)", [title,description,teacher_id], (err, results)=>{
        if(err) return callback(err, null);
        callback(null, {id: results, ...quiz})
    });
};

// Update quizzes

export const updateQuiz = (id: number, quiz: Quiz, callback: Function)=>{
    const {title, description, teacher_id} = quiz;
    db.query("UPDATE quizzes SET title= ? , description= ?, teacher_id= ? WHERE id= ?", [title, description, teacher_id, id], (err, results)=>{
        if(err) return callback(err, null);
        callback(null, results);
    })
}

// Delete Quizes

export const deleteQuiz = (id: number, callback: Function)=>{
    db.query("DELETE FROM quizzes WHERE id = ?",[id],(err)=>{
        if(err) return callback(err);
        callback(null);
    })
}