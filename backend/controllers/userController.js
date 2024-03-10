const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const User = require('../model/userModel')
const expressAsyncHandler = require('express-async-handler')

const getUsers = async (req,res) =>{
    try {
        const {_id,name,email} = await User.findById(req.user.id)
        res.status(200).json({
            id:_id,
            name,
            email
        })
    } catch (error) {
        console.log(error.message)
    }
} 

// @desc    Register user
// @route   POST /registerUser
// @access  Public
const registerUser = expressAsyncHandler( async (req,res) =>{
    
    const { name,email,phone,password} = req.body
    if(!name || !email || !password || !phone){
        res.status(400)
        throw new Error('Please add all fields')
    }
    // Check if user exists
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }
    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword  = await bcrypt.hash(password,salt)

    const  user = await User.create({
        name,
        email,
        phone,
        password:hashedPassword
    })
    if(user) {
        res.status(200).json({
            _id:user.id,
            name:user.name,
            email:user.email
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data !')
    }
   
    res.json({user})

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

const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d',
    })
}
module.exports ={
    getUsers,
    registerUser,
    loginUser
}