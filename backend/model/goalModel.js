const mongoose = require('mongoose');
const {Schema} = mongoose;

const goalSchema = new mongoose.Schema({
    text:{
        type:String,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:[true,'Please add a user id'],
     },
     createdTime: {
        type: Date,
        default: Date.now  
    }
  
    
});


module.exports =mongoose.model('Goal',goalSchema);
