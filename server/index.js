import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import postRoutes from './routes/posts.js'
import userRoutes from "./routes/users.js";


const app = express() 
dotenv.config()

app.use(express.urlencoded({ 
    limit: "30mb", extended: true
}))

app.use(express.json({ 
    limit: "30mb", extended: true
}))

app.use(cors())

app.get('/', (req, res) => {
    res.send('hello to our memories project')
})

// set the postRoutes
app.use('/posts', postRoutes);
app.use('/user', userRoutes);

const PORT = process.env.PORT || 5000


mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => {
        console.log(`server running on port ${PORT}`)
    }))
    .catch((e) => console.log(e))

mongoose.set('useFindAndModify', false)
