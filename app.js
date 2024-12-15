import express from 'express'
// import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './db/connectDB.js'
import moviesRouter from './routes/moviesRouter.js'
import logger from './helpers/logger.js'

dotenv.config()

const app = express()

app.use(morgan('dev'))
// app.use(cors())
app.use(express.json())

//rouets
app.use('/api/v1/movie' , moviesRouter)


connectDB().then(()=>{
    app.listen(process.env.PORT , ()=>{
        console.log(`server started at ${process.env.PORT}`);
        logger.info(`server started at ${process.env.PORT}`);
    })
}).catch((error)=>{
    // console.log("Failed to connect database" ,error);
    logger.error("Failed to connect database" ,error);
})
