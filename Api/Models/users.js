var mongoose = require('mongoose');
const {Schema} = mongoose;
const hashingPassword = require("../helpers/hashing")


const userSchema = new Schema({
    firstname:{
        type:String,
        required: true,
        maxlength: 15,
    },
    lastname:{
      type: String,
      required: true,
      maxlength: 15,  
    },
    email:{
        type:String,
        required:true,
        unique: true,
    },
    password:{
        type:String,
        required: true,
        minlength:7,
        maxlength: 20,
    },
    age:{
        type:Number,
        min: 16,
        required: true,
    },
    img: {
        type: String,
    },
    followingId:{
        type: [String],
    },
    location:{
        type: String,
        required: true,
    }
    },
    {
    writeConcern: {
      w: 'majority',
      j: true,
      wtimeout: 1000
    }
  });

userSchema.pre('save', async function(next){
    const user = this;
    if(user.isModified("password"))
    {
        const hashedPassword = await hashingPassword(user.password);
        user.password = hashedPassword;
    }
        next()
})

module.exports = mongoose.model('User', userSchema)