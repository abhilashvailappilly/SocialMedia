const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const User = require('../model/userModel')
const expressAsyncHandler = require('express-async-handler')


// @desc    Register user
// @route   POST /registerUser
// @access  Public
const login = expressAsyncHandler( async (req,res) =>{
    console.log("Login admin worked")
    const {email,password} = req.body

    const admin = await User.findOne({email})


    if(admin && admin.isAdmin && (await bcrypt.compare(password,admin.password))){
console.log("workws")
        res.json({
            _id:admin.id,
            name:admin.name,
            email:admin.email,
            phone:admin.phone,
            image:admin.image,
            token:generateToken(admin._id)
        })
    } else{
        res.status (400).json({message:'Invalid credentials'})
        // throw new Error('Invalid credentials ')
    }
   


})

// @desc    Register user
// @route   POST /registerUser
// @access  Public
const loginUser = async (req,res) =>{
    try {
        const {email,password} = req.body

        const user = await User.findOne({email})
        if(user && (await bcrypt.compare(password,user.password))){
            res.json({
                _id:user.id,
                name:user.name,
                email:user.email,
                phone:user.phone,
                image:user.image,
                token:generateToken(user._id)
            })
        } else{
            res.status (400).json({message:'Invalid credentials'})
            // throw new Error('Invalid credentials ')
        }
      
    } catch (error) {
        console.log(error.message)
    }
}

module.exports ={
login
}