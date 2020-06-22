const mongoose = require('mongoose');
const express = require('express');
const app = express();

mongoose.connect('mongodb+srv://asmaa:sb3rP3sOuXlaZpcK@cluster0-fa1na.mongodb.net/test?retryWrites=true&w=majority/bloggingWebsite',
    {useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true},
    (err)=>{
    if(err){
        console.error(err);
        process.exit();
    }
    console.log('connected successfully');
    app.listen(9000,()=>console.log('Listening on port 9000'))
})
module.exports = app;