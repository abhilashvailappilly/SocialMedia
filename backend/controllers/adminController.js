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

const getUsers = async (req,res) =>{
    try {
        console.log("get users")
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        console.log(error.message)
    }
} 

// Edit user details by admin
const editUser = expressAsyncHandler( async (req,res) =>{
    console.log("edt woeked")
    console.log("body ",req.body)
    const { name,email,phone,_id} = req.body
    if(!name || !email  || !phone||!_id){
        res.status(400)
        throw new Error('Please add all fields')
    }
    // Check if user exists
    const userExists = await User.findById(_id)
    if(userExists){
        const updateUser = await User.findByIdAndUpdate((_id),{name,email,phone},{new:true})
        if(updateUser) {
          
            res.status(200).json({message:"User updated sucessfully"
            })
        } else {
            res.status(400)
            throw new Error('Failed to update user details !')
        }
    } else {
        res.status(400)
        throw new Error('Failed to update user detail !')
    }
   

})

const toggleBlock = expressAsyncHandler( async (req,res) =>{

   
    const userExists = await User.findById(req.params.id)
    if(userExists){
      userExists.isActive = !userExists.isActive
     const updateUser = await userExists.save()
        if(updateUser) {
            res.status(200).json({
                message:"Status changed successfully"
            })
        } else {
            res.status(400)
            throw new Error('Failed to update user details !')
        }
    } else {
        res.status(400)
        throw new Error('Failed to update user detail !')
    }
   

})

const deleteUser = expressAsyncHandler( async (req,res) =>{

    const user = await User.findByIdAndDelete(req.params.id)
    console.log("user:",user)
    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }
    if (user) {
        res.status(200).json({ message: "User deleted successfully" });
    }

})

const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d',
    })
}

module.exports ={
login,
getUsers,
editUser,
toggleBlock,
deleteUser
}