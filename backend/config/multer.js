
// multer configuration
const multer = require('multer')
const path  = require('path')

const storage = multer.diskStorage({
    destination:function (req,file,cb){
       return  cb(null,path.join(__dirname,'../public/user/profile'));
    },
    filename:function(req,file,cb){
        const name = Date.now()+'-'+ file.originalname;
        
       return cb(null,name);

    }
    
});

const upload = multer({storage:storage})


module.exports ={
    upload

}