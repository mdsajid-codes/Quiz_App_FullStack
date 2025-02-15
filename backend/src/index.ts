import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes'
import quizRoutes from './routes/quizRoutes'


const app = express()

// Middleware
app.use(cors());
app.use(express.json());

// Routes 
app.use('/users', userRoutes);
app.use('/dashboard', quizRoutes)

app.listen(4000, ()=>{
    console.log('http://localhost:4000');
})