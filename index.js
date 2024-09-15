import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'


import { aiRouter } from './routes/ai_route.js'


dotenv.config({path:'./.env'})

const app = express()
const PORT = process.env.PORT || 3000



app.use(express.json({ limit:"16kb"}))
app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173/"
}))

app.get("/",(req,res) => {
    res.json({
        message:"Hello World"
    })
})

app.use('/api/v1/ai',aiRouter)

  

app.listen(PORT, ()=>{
    console.log(`App started listening on port ${PORT}`)
})




