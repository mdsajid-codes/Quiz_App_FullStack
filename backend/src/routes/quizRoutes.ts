import express from 'express';
import { addQuiz, editQuiz, getData, getDatas, removeQuiz } from '../controllers/quizControllers';

const router = express.Router();

router.get('/', getDatas);
router.get('/:id', getData)
router.post('/add', addQuiz);
router.post('/update/:id', editQuiz);
router.delete('/delete/:id', removeQuiz);

export default router;