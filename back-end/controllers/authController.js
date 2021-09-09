const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
exports.register = async (req,res,next) =>{
    try{
        const user = await User.create(req.body);
        const token = jwt.sign({userId:user._id},process.env.APP_SECRET);
        res.status(200).json({
            status:'success',
            data:{token, userName:user.name}
        })
    }catch(error){
        next(error);
    }
};

exports.login = async (req,res,next) =>{
    try{
        const user = await User.findOne({email:req.body.email});
        if(!user){
            //err email is not corect
            const err = new Error('email is not correct');
            err.statusCode = 400;
            return next(err);
        }
        if(bcrypt.compareSync(req.body.password,user.password)){
            const token = jwt.sign({userId:user._id},process.env.APP_SECRET);
            res.status(200).json({
                status:'success',
                data:{
                    token,userName:user.name
                }
            })
        }else{
            //err: password is not correct
            const err = new Error('password is not correct');
            err.statusCode = 400;
            return next(err);
        }
    }catch(error){
        res.json(error);
    }
};

exports.getCurrentUser = async (req,res,next) =>{
    try{
        const data = {user:null}
        if(req.user){
            console.log('req.user',req.user)
            const user = await User.findOne({_id:req.user.userId});
            data.user = {userName : user.name}
        }
        res.status(200).json({
            status:'success',
            data: data
        })
    }catch(err){
        res.json(err)
    }
}
