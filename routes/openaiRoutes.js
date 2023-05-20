import express from 'express'
import { getReply } from '../controllers/openaiController.js';


const router = express.Router();

router.post('/get-reply',getReply)

export default router    