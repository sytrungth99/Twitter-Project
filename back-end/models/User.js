const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
    name:{type: String, unique:true, trim: true, require:[true,'name must be require']},
    email:{type: String,unique:true, trim:true, require:[true,"email must is require"]},
    password:{type: String, trim:true, require:[true,"password must is require"],minlength:[6,
    'Password must be 6 character']}
},{timestamps:true});
//Middleware
userSchema.pre('save', function(next) {
    let user = this;
    //ma hoa password trong data base
    bcrypt.hash(user.password,10,function(error,hash){
        if(error){
            return next(error);
        }else{
            user.password = hash;
            next();
        }
    })
});

const User = mongoose.model('User',userSchema);

module.exports = User;