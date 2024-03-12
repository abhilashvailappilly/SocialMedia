const express = require('express')
const Multer = require('../config/multer')
const user_route = express.Router()

const {protect} = require('../middleware/authMiddleware')
const userController = require('../controllers/userController')
const adminController = require('../controllers/adminController')
const goalController = require('../controllers/goalController')

user_route.post('/login',userController.loginUser);
user_route.get('/users',protect, userController.getUsers);
user_route.post('/register',userController.registerUser);
user_route.post('/uploadProfile',protect,Multer.upload.single('image'),userController.uploadProfile);
user_route.post('/updateProfile',protect,userController.updateProfile);

user_route.post('/adminLogin',adminController.login)
 


user_route.post('/addGoal',protect,goalController.addGoal);
user_route.delete('/deleteGoal/:id',protect,goalController.deleteGoal);
 
 
module.exports = user_route