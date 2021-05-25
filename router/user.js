const express = require('express');
const router = express.Router();
const csvtojson =require('csvtojson');
const isauth = require('./auth.js');
const userController = require('../controller/user');
const File = require('../model/file');
const Upload=require('express-fileupload');
express().use(Upload());



router.post('/register', userController.register);
router.post('/login', userController.login);
router.post("/upload",isauth,(req,res)=>{
    if(req.files)
console.log(req.files);

console.log(req.files);
console.log("hii");
 let file = req.files.file1;
 let filename= file.name;
 
file.mv('./uploads/'+filename,function(err){
     if(err)
     console.log(error);
     else
     console.log("File Uploaded");
 


console.log(csvtojson()
.fromFile('./uploads/'+filename)
.then(csvData => {
File.insertMany(csvData,(err,res)=>{
if(err)
console.log(err);
})
}));
}
);
res.send("Success");
}
);
router.post('/insertdata',isauth,userController.insertdata);
router.get('/removedata',isauth, userController.removedata);
router.post('/updatedata',isauth,userController.updatedata);
router.get('/searchdata',isauth,userController.searchdata);

module.exports = router;
