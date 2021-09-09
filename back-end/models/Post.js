const mongoose = require('mongoose');

const postScheme = new mongoose.Schema({
    content:{type: String, required:[true,'post must have content'],trim:true},
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'//colection
    }
},{timestamps:true}); 

const Post = mongoose.model('Post',postScheme);

module.exports = Post;
