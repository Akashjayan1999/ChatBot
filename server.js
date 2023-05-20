import express from 'express'
import color from 'colors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js'
import openaiRoutes from './routes/openaiRoutes.js'

//configure env
dotenv.config()


//configure database
connectDB()


//rest object
const app = express()

//middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/openai',openaiRoutes);

app.get('/',(req,res)=>{
    res.send("Welcome to ChatBot")
})

//PORT
const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log(`Server Running on ${process.env.DEV_MODE}`.bgCyan.white)
})