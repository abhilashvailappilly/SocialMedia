const express = require('express')
const colors  =  require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} =require('./middleware/errorMiddleware')

const dataBase = require('./config/mongo')
dataBase.dbConnect();

const app = express()

const port = 5000 || process.env.PORT

app.use(express.urlencoded({extended:true}))
app. use(express.json());

//for user router
const userRoute = require('./Routes/route')
app.use('/',userRoute);

// app.use('/api/goals',require('./Routes/route'))
app.get('/api/user',(req,res)=>{
    res.json({name:"Abhilash v s"})
})
app.use(errorHandler)

app.listen(port,()=>console.log(`Server Started on http://localhost:${port}`))