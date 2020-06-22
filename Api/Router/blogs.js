const express = require('express');
const Post = require('../Models/blogs')
const jwt = require('jsonwebtoken')
const postRouter = express.Router();
const authorization = require('../middlewares/authorization')

//add ToDo
postRouter.post('/add',authorization,async (req,res, next)=>{
    
        const{title,body,tags} = req.body;
        const newPost = new Post({
            userId: user._id,
            title,
            body,
            tags,
            author: user.firstname + user.lastname,
            createdAt: Date.now(),
        });
        const savedPost = await newPost.save();
        res.status(201).send(savedPost.toJSON())
    });

//edit
postRouter.post('/edit/:id',authorization,async (req,res,next)=>{
    try{
        // TODO : find the post by the authorization && the id of post
        const post = await Post.findOne({userId : decoded._id} && {id: req.params.id})
        if(!post) throw new Error("there is no posts")
        const { title,body,tags}= req.body
        post.title= title;
        post.tags=tags;
        post.body= body;
        const editedPost = await post.save();
        res.status(200).send('post is updated succesfully')
    }catch(error)
    {
        next(error);
    }
    
})
//delete todo
blogRouter.get('/delete/:id', authorization,async(req,res,next)=>{
    const post = await Post.findOne({userId : decoded._id} && {id: req.params.id})
    if(post)
    {
        Post.deleteOne(post, function (err) {
            if(err) next(new Error('something went wrong'));
            res.status(201).send("todo is deleted successfully") 
          });
    }else{
        next(new Error('post is not found'))
    }
})

//search by author name or tags or title
blogRouter.get('/search',authorization, async(req,res,next)=>{
    try{
        const searchText = req.params.searchText;
        const posts = await Post.filter({title: searchText} || {tags: searchText} || {author: searchText})
        if(!user) throw new Error('No data found')
        ToDo.find({}).where('username').in([user.username]).exec(function (err, todos) {
            if(err) throw err
            if(todos.length===0) res.status(200).send("ToDo is empty")
            else res.status(200).json(todos)
        })
    }catch(err)
    {
        next(err);
    }
})


module.exports = blogRouter;