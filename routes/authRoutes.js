import express from 'express'

import { loginController, registerController } from '../controllers/authContoller.js'
const router = express.Router()
//user registration

router.post('/register',registerController)
//user Login
router.post('/login',loginController)

export default router 