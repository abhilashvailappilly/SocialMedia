const Goal  = require('../model/goalModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const User = require('../model/userModel')
const asyncHandler = require('express-async-handler')

const addGoal =  asyncHandler( async (req,res) => {
    console.log(req.user)
    if(!req.body.text){
        res.status(400)
        throw new Error ('Please add a text field')
    }
    const goal = await Goal.create({
        text : req.body.text,
        user : req.user.id
    })
    if(goal) {
        res.status(200).json(goal)
    }
})


const updateGoal =  asyncHandler( async (req,res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }
   const user = await User.findById(req.user.id)

   if(!user) {
    res.status(401)
    throw new Error('User not found')
   }

   // Make sure that the logged in user matches the goal user
   if(goal.user.toString() !== user.id) {
    res.status(401)
    throw new Error('User not authorized')
   }
   const updatedGoal = await Goal.findByIdAndUpdate(req.params.id,req.body,{new:true})
   res.status(200).json(updatedGoal)
})

const deleteGoal  = asyncHandler(async(req,res) =>{
    console.log("Delte goal")
    const goal = await Goal.findById(req.params.id)

    if(!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }
   const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found')
       }
    
       // Make sure that the logged in user matches the goal user
       if(goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
       }
    await goal.deleteOne()

    res.status(200).json({id:req.params.id})
})


module.exports = {
    addGoal,
    updateGoal,
    deleteGoal
}