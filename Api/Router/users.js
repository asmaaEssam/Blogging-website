const express = require('express');
const _ = require('lodash')
const bcrypt = require('bcryptjs')
const { promisify } = require('util');
const jwt = require('jsonwebtoken')
const User = require('../Models/users')
const userRouter = express.Router();
const validateEmail = require("../helpers/emailValidation")
const errorhandler = require('../middlewares/errorhandler')
const authorization = require('../middlewares/authorization')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./usersimgsuploads/');
    },
    filename: function(req,file,cb){
        cb(null,new Date().toISOString + file.originalname)
    }
});
const upload = multer({storage: storage})


// Registration for users
userRouter.post('/register',async (req,res, next)=>{
    try{
        const{firstname,lastname,email, password,confirmpassword, age,location} = req.body;
        if (password !== confirmpassword) throw new Error("Mismatching password")
        if(!validateEmail(email)) throw new Error("invaild email format")
        const newUser = new User({
            firstname,
            lastname,
            email,
            password,
            age,
            location
        });
        const savedUser = await newUser.save();
        // TODO: using select instead of omit
        const instance= _.omit(savedUser.toJSON(), "password")
        res.status(201).send(instance)
    }catch(error){
        next(error)
    }
   
});

//Login
userRouter.post('/login',async(req,res,next)=>{
    try{
        const {email,password} = req.body;
        const user= await User.findOne({email});
        if(!user) throw new Error("invalid Email address")
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch) throw new Error("Wrong Password")
        const token = await promisify(jwt.sign)({email },'askidni1654', {expiresIn: "60m"});
        res.send(token)

    }catch(error){
        next(error)
    }
})

userRouter.post('/edit/:id',authorization,upload.single(),async (req,res, next)=>{
    try{
        const{firstname,lastname, age,location} = req.body;
        const currUser = await User.find({_id: req.params.id})
        currUser = {
            firstname,
            lastname,
            img : req.file.path,
            age,
            location
        };
        const editedUser = await currUser.save();
        res.status(201).send(editedUser)
    }catch(error){
        next(error)
    }
   
});

userRouter.use(errorhandler)



module.exports = userRouter;