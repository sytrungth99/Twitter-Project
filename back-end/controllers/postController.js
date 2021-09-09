const Post = require('../models/Post');
//get all post

exports.getAllPost = async (req,res,next) =>{
    try{
        const posts = await Post.find({}).populate('author','name email').select('content createdAt');
        res.status(200).json({
            status:"success",
            results:posts.length,
            data:{posts}
        })
    }catch(error){
        res.json(error)
    }
};

//create one post
exports.createOnePost = async (req,res,next) =>{
    try{
        const {userId} = req.user;
        console.log('userId',userId)
        const post = await Post.create({...req.body, author:userId});
        res.status(200).json({
            status:"success",
            data:{post},
           
        })
    }catch(err){
        next(err)
    }


}
//update one Post
exports.updateOnePost = async (req,res,next) =>{
    try{
        const {postId} = req.params;
       
        const posts = await Post.findByIdAndUpdate(postId,{...req.body},{new:true, runValidator:true});

       
        res.status(200).json({
            status:"success",
            data:{posts}
        })
    }catch(error){
        next(error)
    }
};

//delete one Post
exports.deleteOnePost = async (req,res,next) =>{
    try{
        const {postId} = req.params;
       
         await Post.findByIdAndDelete(postId);

       
        res.status(200).json({
            status:"success",
            message:'Post has deleted'
        })
    }catch(error){
        next(error)
    }
};
