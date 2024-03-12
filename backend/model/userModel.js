const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:[true,'Please add a email'],
        unique:true
     },
     phone:{
        type:Number,
        required:true
     },
     password:{
        type:String,
        required:true
     } ,
      isAdmin:{
         type:Boolean,
         required:false,
         default:false
     },
     image:{
        type:String,
        required:false
     },
     isActive:{
      type:Boolean,
      required:false,
      default:true
     } ,
     createdTime: {
        type: Date,
        default: Date.now  
    }
  
    
});


module.exports =mongoose.model('User',userSchema);
