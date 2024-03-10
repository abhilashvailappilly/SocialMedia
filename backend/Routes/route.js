const express = require('express')
const user_route = express.Router()

const {protect} = require('../middleware/authMiddleware')
const userController = require('../controllers/userController')
const goalController = require('../controllers/goalController')

user_route.post('/login',userController.loginUser);
user_route.get('/users',protect, userController.getUsers);
user_route.post('/registerUser',userController.registerUser);
user_route.post('/addGoal',protect,goalController.addGoal);
user_route.delete('/deleteGoal/:id',protect,goalController.deleteGoal);
 
 
module.exports = user_route