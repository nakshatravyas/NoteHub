const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const userRouter = require('./routes/userRouter')
const noteRouter=require('./routes/noteRouter')

const app = express()
dotenv.config()
app.use(express.json())
app.use(cors(
    {
        origin: ["https://note-hub.vercel.app/"],
        methods: ["POST","GET","PUT","DELETE"],
        credentials: true
    }
))

//Routes
app.use('/users', userRouter)
app.use('/api/notes', noteRouter)

//Connect to mongoDB
const URI = process.env.MONGODB_URL
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log(`MongoDB Connected : ${conn.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit()
    }
}
connectDB()
//Listening on port
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('Server is running on port : ', PORT)
})

