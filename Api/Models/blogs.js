var mongoose = require('mongoose');
const {Schema} = mongoose;

const blogSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    title:{
        type:String,
        required: true,
        minlength: 5,
        maxlength: 20,
    },
    body:
    {
        type:String,
    },
    img: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    createdAt:
    {
        type : Date,
    },
    updatedAt:
    {
        type: Date,
    },
    tags: 
    { type: [String],
    }
});

blogSchema.index({ author: 1, title: 1 , tags: 1});

module.exports = mongoose.model('Blog', blogSchema)