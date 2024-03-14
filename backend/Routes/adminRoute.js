const express = require('express')
const Multer = require('../config/multer')
const admin_route = express.Router()

const {protect} = require('../middleware/authMiddleware')
const userController = require('../controllers/userController')
const adminController = require('../controllers/adminController')
const goalController = require('../controllers/goalController')

admin_route.get('/getUsers',protect, adminController.getUsers);
admin_route.post('/editUser',protect, adminController.editUser);
admin_route.patch('/toggleUser/:id',protect,adminController.toggleBlock)
admin_route.delete('/deleteUser/:id',protect,adminController.deleteUser)


module.exports = admin_route
