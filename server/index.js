import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import postRoutes from './routes/posts.js'

const app = express() 

app.use(express.urlencoded({ 
    limit: "30mb", extended: true
}))

app.use(express.json({ 
    limit: "30mb", extended: true
}))

app.use(cors())

// set the postRoutes
app.use('/posts', postRoutes)

const CONNECTION_URL = 'mongodb://localhost:27017'
const PORT = process.env.PORT || 5000

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => {
        console.log(`server running on port ${PORT}`)
    }))
    .catch((e) => console.log(e))

mongoose.set('useFindAndModify', false)
