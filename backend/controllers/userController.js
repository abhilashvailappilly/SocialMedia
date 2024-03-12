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
            email:user.email,
            phone : user.phone,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data !')
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

const uploadProfile = async(req,res) =>{
    try {
        console.log('workd')
        // console.log("upload file ",req.user)
        if (req.file && req.file.filename) {
            const user = await User.findByIdAndUpdate((req.user._id),{image:req.file.filename},{new:true})
            // user.image
            console.log(user) 
            return res.status(200).json({message:'Profile updated successfully'});
        }
        return res.status(400).json({message:'No files were uploaded.'});

    } catch (error) {
        console.log(error.message)
    }
}

const updateProfile = expressAsyncHandler( async (req,res) =>{
    
    const { name,email,phone} = req.body
    if(!name || !email  || !phone){
        res.status(400)
        throw new Error('Please add all fields')
    }
    // Check if user exists
    const userExists = await User.findOne({email})
    if(userExists){
        const updateUser = await User.findByIdAndUpdate((req.user._id),{name,email,phone},{new:true})
        if(updateUser) {
            // res.status(200).json({
            //    message:"Profile updated successfully"
            // })
            res.status(200).json({
                _id:updateUser.id,
                name:updateUser.name,
                email:updateUser.email,
                phone:updateUser.phone,
                image:updateUser.image,
                token:generateToken(updateUser._id)
            })
        } else {
            res.status(400)
            throw new Error('Failed to update profile !')
        }
    } else {
        res.status(400)
        throw new Error('Failed to update profile !')
    }
   

})

const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d',
    })
}
module.exports ={
    getUsers,
    registerUser,
    loginUser,
    uploadProfile,
    updateProfile
}