const express = require('express')
const colors  =  require('colors')
const cors = require('cors')
const dotenv = require('dotenv').config()
const {errorHandler} =require('./middleware/errorMiddleware')

const dataBase = require('./config/mongo')
dataBase.dbConnect();

const app = express()

const port = 5000 || process.env.PORT

app.use(express.urlencoded({extended:true}))
app. use(express.json());
app.use(cors())
app.use(express.static('public'))
//for user router
const userRoute = require('./Routes/route')
const adminRoute = require('./Routes/adminRoute')
app.use('/',userRoute);
app.use('/admin',adminRoute);


app.use(errorHandler)

app.listen(port,()=>console.log(`Server Started on http://localhost:${port}`))